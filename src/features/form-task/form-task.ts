import { TasksStorageService } from './task-storage.service';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea, TuiTextareaLimit, TuiChip } from '@taiga-ui/kit';
import { TuiItemGroup } from '@taiga-ui/layout';

@Component({
  selector: 'app-form-task',
  imports: [ReactiveFormsModule,
    TuiButton,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfield, FormsModule, NgForOf, TuiChip, TuiItemGroup],
  templateUrl: './form-task.html',
  styleUrl: './form-task.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTask {
  protected control = new FormControl('');
  protected chips: string[] = [];
  protected checked: boolean[] = [];

  constructor(private storage: TasksStorageService) {
    this.control.markAsTouched();
    this.chips = this.storage.getTasks();
    this.checked = this.storage.getChecked();
  }

  addTask() {
    const task = this.control.getRawValue();
    if (task?.trim()) {
      this.chips.push(task);
      this.checked.push(false);
      this.control.setValue('');
      this.storage.addTask(task);
    }
  }

  clearTasks(){
    this.chips = []
    this.checked = []
    this.storage.clearStorage()
  }

  onCheckChange() {
    this.storage.setChecked(this.checked)
  }

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') { 
      this.addTask()
     }
  }

  ngOnInit() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
