import {Component, Input} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPreview,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop disabled sorting
 */
@Component({
  selector: 'app-sorting-game',
  templateUrl: 'sorting-game.component.html',
  styleUrls: ['sorting-game.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPreview],
})

export class SortingGameComponent {
  arrayItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  gridCells = Array.from({ length: 16 }, (_, index) => `Cell ${index + 1}`);

  drop(event: CdkDragDrop<string[]>): void {
    const item = event.item.data;
    console.log(event.previousContainer.data)
    console.log(item)
    // Calculate the center of the drop container
    const dropContainerRect = event.container.element.nativeElement.getBoundingClientRect();
    const center = {
      x: dropContainerRect.left + dropContainerRect.width / 2,
      y: dropContainerRect.top + dropContainerRect.height / 2,
    };

    // Calculate the distance between the released position and the center
    const distance = Math.sqrt(
      Math.pow(event.distance.x, 2) +
      Math.pow(event.distance.y, 2)
    );

    // Check if the released position is close to the center
    const distanceThreshold = 20; // Adjust as needed

    // If the released position is close, snap to the center
    if (distance < distanceThreshold) {
      console.log("over")
      event.item._dragRef.reset();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (event.container === event.previousContainer) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
