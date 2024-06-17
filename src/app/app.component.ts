import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../shared/model';
import { repo } from 'remult';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ready-to-play-angular';
  tasks: Task[] = [];
  ngOnInit() {
    repo(Task)
      .find()
      .then((x) => (this.tasks = x));
  }
}
