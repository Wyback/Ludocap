import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-house-item-list',
  templateUrl: './house-item-list.component.html',
  styleUrls: ['./house-item-list.component.css']
})
export class HouseItemListComponent {

  protected item: any = {}
  protected items: any[] = []

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    // Fetch items from the service or set them as needed
    this.items = this.dataService.getItems();
  }

  onDrop(event: CdkDragDrop<any>) {
    this.dataService.myMethod(event.previousIndex)
  }
}
