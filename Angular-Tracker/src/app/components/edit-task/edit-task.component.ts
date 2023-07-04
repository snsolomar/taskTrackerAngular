import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private taskService: TaskService) {
    this.subscription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {
    this.text = this.task.text;
    this.day = this.task.day;
    this.reminder = this.task.reminder;
  }

  onSubmit() {
    if (!this.text) {
      alert('Please edit a task!');
      return;
    }

    const updatedTask: Task = {
      ...this.task,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.taskService.updateTaskReminder(updatedTask).subscribe(task => {
      this.onUpdateTask.emit(task);
    });
  }
}
