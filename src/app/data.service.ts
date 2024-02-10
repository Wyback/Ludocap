import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private item = new BehaviorSubject({});
  getItem = this.item.asObservable()

  constructor() {
  }

  setActiveConsumer(item: any) {
    this.item.next(item)
  }

  // Add items array to hold items for the list
  private items: any[] = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
    { text: 'Item 5' }
  ];

  public getItems() {
    return this.items;
  }

}