import { Component, Input } from '@angular/core';
import type { User } from './user.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-component',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.less',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class UserComponent {
  @Input() user!: User;
}
