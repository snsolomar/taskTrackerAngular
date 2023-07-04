import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';


// Interface
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  editingTask: Task | null = null;

  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // think of subscribe as a promise
    // subscribe on observables -getTasks() is the observable in this case
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  };

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    // console.log(task.reminder);
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  editTask(task: Task) {
    this.editingTask = {...task}; // Make a copy of task
    this.taskService.patchTask(task).subscribe((updatedTask) => {
      // Find the index of the task to update.
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        // Update the task at the found index.
        this.tasks[index] = updatedTask;
      }
    });
  }

  finishEditing() {
    this.editingTask = null;
  }


}
