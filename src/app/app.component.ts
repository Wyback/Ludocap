import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ludocap';

  onItemDropped(item: string) {
    // Handle the dropped item if needed
    console.log('Dropped item:', item);
  }
}
