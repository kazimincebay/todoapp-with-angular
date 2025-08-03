import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <h1>Todo App</h1>
    @if(!isUpdateWorkFormActive){
    <div>
      <label>Work</label>
      <input type="text" [(ngModel)]="work" />
      <button (click)="save()">Save</button>
    </div>
    <hr />
    }@else{
    <div>
      <label>Update Work</label>
      <input type="text" [(ngModel)]="updateWork" />
      <button (click)="update()">Update</button>
    </div>
    <hr />
    }

    <div>
      <ul>
        @for(data of todos; track data){
        <li>
          {{ data }}
          @if(!isUpdateWorkFormActive){
          <button (click)="get($index)">Update</button>
          <button (click)="delete($index)">Delete</button>
          }
        </li>
        }
      </ul>
    </div>
  `,
})
export class App {
  protected readonly title = signal('todo-app');
  work: string = '';
  updateWork: string = '';
  updateIndex: number = 0;
  todos: string[] = [];
  isUpdateWorkFormActive: boolean = false;
  save() {
    this.todos.push(this.work);
    this.work = '';
  }

  get(index: number) {
    this.updateIndex = index;
    this.updateWork = this.todos[index];
    this.isUpdateWorkFormActive = true;
  }

  update() {
    this.todos[this.updateIndex] = this.updateWork;
    this.isUpdateWorkFormActive = false;
  }

  delete(index: number) {
    this.todos.splice(index, 1);
  }
}
