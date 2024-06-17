import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Order } from '../../../shared/model';
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
  orders: Order[] = [];
  ngOnInit() {
    repo(Order)
      .find({
        include: {
          details: true,
        },
      })
      .then((x) => (this.orders = x));
  }
}
