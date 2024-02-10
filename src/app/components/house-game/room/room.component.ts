import { Component, Input, OnInit } from '@angular/core';
import { Coord } from '../coord';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  
  @Input()
  position!: Coord;
  
  get black() {
       const { x, y } = this.position;
       return (x + y) % 2 === 1;
  }


  constructor() { }

  ngOnDestroy() {
  }

}