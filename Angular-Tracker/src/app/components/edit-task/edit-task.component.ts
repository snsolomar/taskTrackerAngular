import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
// export class EditTaskComponent implements OnInit, OnChanges {
export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() onPatchTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean = false;
  subscription: Subscription;
  showPatchTask: boolean;

  constructor(private taskService: TaskService, private uiService: UiService ) {
    this.subscription = this.uiService.onTogglePatch().subscribe(value => (this.showPatchTask = value));
   }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
        alert('Please edit a task!');
        return;
    }

    const patchTask: Task = {
        ...this.task,
        text: this.text,
        day: this.day,
        reminder: this.reminder,
    };

    this.taskService.patchTask(patchTask).subscribe(task => {
        this.onPatchTask.emit(task);

        // Once the task has been patched, hide the form
        this.showPatchTask = false;
    });
}
}
