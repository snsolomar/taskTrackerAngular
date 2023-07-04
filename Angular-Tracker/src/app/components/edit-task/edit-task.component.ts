import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnChanges {

  @Input() task: Task;
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    // This will run whenever @Input() task changes
    if (changes.task && changes.task.currentValue) {
      this.text = changes.task.currentValue.text;
      this.day = changes.task.currentValue.day;
      this.reminder = changes.task.currentValue.reminder;
    }
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
