import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class TasksStorageService {
  private storageKey = 'tasks';
  private checkedKey = 'checked-tasks'

  getTasks() {
    const tasks = window.localStorage.getItem(this.storageKey)
    return tasks ? tasks.split(' ') : []
  }

  getChecked() {
    const checked = window.localStorage.getItem(this.checkedKey)
    return checked ? checked.split(' ').map((el) => el === 'true' ? true : false) : this.getTasks().map(() => false)
  }

  setChecked(newArrChecked: boolean[]) {
    window.localStorage.setItem(this.checkedKey, newArrChecked.join(' '))
  }

  addTask(task: string) {
    const tasks = this.getTasks()
    tasks.push(task)
    window.localStorage.setItem(this.storageKey, tasks.join(' '))
  }

  clearStorage() {
    window.localStorage.removeItem(this.storageKey)
  }
}