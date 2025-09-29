import { Component } from '@angular/core';
import { FormTask } from '../../features/form-task/form-task';

@Component({
  selector: 'app-tasks',
  imports: [FormTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.less'
})
export class Tasks {

}
