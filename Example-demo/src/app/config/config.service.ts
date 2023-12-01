import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config, Hero } from './config';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  configUrl = 'assets/config.json';
  heroesSearchUrl = 'assets/config.json';

  getConfig() {
    return this.http
      .get<Config>(this.configUrl)
      .pipe(catchError(this.handleError));

    // return this.http.get<Config>(this.configUrl).pipe(
    //   retry(3), // retry a failed request up to 3 times
    //   catchError(this.handleError) // then handle the error
    // );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.configUrl, { observe: 'response' });
  }

  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, { responseType: 'text' }).pipe(
      tap(
        // Log the result or error
        {
          next: (data) => console.log(filename, data),
          error: (error) => console.log(filename, error),
        }
      )
    );
  }

  /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   term = term.trim();

  //   const heroesUrl = `${this.heroesSearchUrl}?${term}`;
  //   return this.http.jsonp(heroesUrl, 'callback').pipe(
  //     map((result) => this.jsonpResultToHeroes(result)),
  //     catchError(this.handleError('searchHeroes', []))
  //   );
  // }
}
