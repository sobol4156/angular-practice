import { UserComponent } from './../../entities/user/user';
import { Component, Input } from '@angular/core';
import { User } from '../../entities/user/user.model';

@Component({
  selector: 'app-user-table',
  imports: [UserComponent],
  templateUrl: './user-table.html',
  styleUrl: './user-table.less'
})
export class UserTable {
  @Input() users!: User[]
}
