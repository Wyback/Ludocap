import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent {

  public data: Array<any> = MyData
  gridCells = ['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5', 'Cell 6'];

  constructor(private dataService: DataService) {
    this.dataService.myMethod$.subscribe((data) => {
      this.data = data
    })
  }

  onDropGrid(event: CdkDragDrop<any>) {
    
  }
}
