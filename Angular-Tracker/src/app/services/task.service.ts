import { Injectable } from '@angular/core';
// Fake Database
import { TASKS } from '../mock.tasks';
// Interface
import { Task } from 'src/app/Task';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {};

  getTasks(): Observable<Task[]> {
    const tasks =  of(TASKS);
    return tasks;
  };
}
