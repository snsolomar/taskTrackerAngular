import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();
  private showPatchTask: boolean = false;
  private subjectPatch = new Subject<any>();

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  togglePatchTask(): void {
    this.showPatchTask = !this.showPatchTask;
    this.subject.next(this.showPatchTask);
  }

  onTogglePatch(): Observable<any> {
    return this.subjectPatch.asObservable();
  }
}
