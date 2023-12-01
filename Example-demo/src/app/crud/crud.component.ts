import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Subject, filter, startWith, switchMap, take, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './crud.module';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CRUDComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: ServiceService
  ) {}

  users: any;
  formSubmits = new Subject<boolean | null>();

  formCreateUser = this.formBuilder.group({
    id: [0],
    name: ['', Validators.compose([Validators.required])],
    location: ['', Validators.compose([Validators.required])],
  });

  ngOnInit(): void {
    this.formSubmits
      .pipe(
        tap(() => this.formCreateUser.markAsDirty()),
        switchMap(() =>
          this.formCreateUser.statusChanges.pipe(
            startWith(this.formCreateUser.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.saveUser();
        })
      )
      .subscribe();
    this.getUsers();
  }

  getUsers() {
    this.userService.getListUser().subscribe((users) => (this.users = users));
  }

  saveUser() {
    const { location, name, id } = this.formCreateUser.value;

    if (location && name) {
      const request: User = {
        id: id ? id : this.users.at(-1).id + 1,
        name: name,
        location: location,
      };

      if (id) {
        this.userService.saveUser(request, true).subscribe(() => {
          this.getUsers();
          this.onRefresh();
        });
      } else {
        this.userService.saveUser(request).subscribe((insertedUser) => {
          this.users.push(insertedUser);
          this.onRefresh();
        });
      }
    }
  }

  selectedUser(user: User) {
    this.formCreateUser.patchValue({
      id: user.id,
      name: user.name,
      location: user.location,
    });
  }

  onRefresh() {
    this.formCreateUser.setValue({ id: null, name: '', location: '' });
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
      this.onRefresh();
    });
  }
}
