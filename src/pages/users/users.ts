import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, BehaviorSubject, delay, combineLatest } from 'rxjs';
import { UserTable } from "../../features/user-table/user-table";
import { TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { User } from '../../entities/user/user.model';
import { UserFilters } from '../../features/user-filters/user-filters';
import { AsyncPipe } from '@angular/common';


interface Character {
  readonly filter: string;
}

@Component({
  selector: 'app-users',
  imports: [UserTable, UserFilters, TuiLoader, AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
})
export class Users {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private filterSubject = new BehaviorSubject<{ filter: string; value: string } | null>(null);

  users$!: Observable<User[]>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers()
      .pipe(delay(2000))
      .subscribe(users => this.usersSubject.next(users));

    this.users$ = combineLatest([this.usersSubject, this.filterSubject]).pipe(
      map(([users, filter]) => {
        if (!filter || !filter.value) return users;

        const path = filter.filter.split('.');

        return users.filter(user => {
          let value: any = user;
          for (const key of path) {
            value = value?.[key];
          }
          return value?.toString().toLowerCase().includes(filter.value.toLowerCase());
        });
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users`)
  }

  onFilterChange(event: { filter: string; value: string }) {
    this.filterSubject.next(event);
  }
}
