import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './crud.module';

const URL = 'http://localhost:3000/users';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private HTTP: HttpClient) {}
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getListUser(): Observable<User> {
    return this.HTTP.get<User[]>(URL).pipe(map((response: any) => response));
  }

  saveUser(user: User, isEdit: boolean = false): Observable<User | any> {
    if (isEdit) {
      return this.HTTP.put(`${URL}/${user.id}`, user, httpOptions).pipe(
        tap((updatedUser) =>
          console.log(`updated user = ${JSON.stringify(updatedUser)}`)
        ),
        catchError((error) => of(error))
      );
    } else {
      return this.HTTP.post<User>(URL, user, httpOptions).pipe(
        tap((user: User) =>
          console.log(`inserted user = ${JSON.stringify(user)}`)
        ),
        catchError((error) => of(error))
      );
    }
  }

  deleteUser(id: number): Observable<User | any> {
    return this.HTTP.delete(`${URL}/${id}`, httpOptions).pipe(
      tap(() => console.log(`delete user`)),
      catchError((error) => of(error))
    );
  }
}
