import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Video } from '../Models/video';
import { PlayVideoComponent } from './play-video/play-video.component';
import { FormControl } from '@angular/forms';
import { NewVideoDialogComponent } from './new-video-dialog/new-video-dialog.component';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations'; // Add this line
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-video-prompt',
  templateUrl: './video-prompt.component.html',
  styleUrls: ['./video-prompt.component.css'],
  animations: [
    trigger('shake', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(0)' })),
      transition('start => end', animate('700ms', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-10px)', offset: 0.2 }),
        style({ transform: 'translateX(10px)', offset: 0.4 }),
        style({ transform: 'translateX(-10px)', offset: 0.6 }),
        style({ transform: 'translateX(10px)', offset: 0.8 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ]))),
    ],),
    trigger('cardHover', [
      state('notHovered', style({ transform: 'scale(1)', backgroundColor: '#c9a0dc', color: 'white' })),
      state('hovered', style({ transform: 'scale(1.1)', backgroundColor: '#ae8abf', color: 'white', zIndex: 1 })),
      transition('* => hovered', animate('300ms ease-in')),
      transition('hovered => notHovered', animate('300ms ease-out')),
    ]),    
  ],
})
export class VideoPromptComponent {

  items: Video[] = [];
  newItemUrl: string = '';
  newItemTitle: string = '';
  newItemInput: string = '';
  showForm: boolean = false;
  isTutor: boolean = true;
  isRedirectActivated: boolean = true;
  currentIndex: number = 0;
  animationState: string = 'start';
  newItemUrlControl = new FormControl('');
  newItemTitleControl = new FormControl('');
  newItemInputControl = new FormControl('');
  isIconLeftHovered = false;
  isIconRightHovered = false;
  cardState = 'in';
  showToggle: boolean = false;
  isToSubmit: boolean = false;
  isValidInput: boolean = false;
  hoveredCardIndex: number | null = null;

  inputObservable: Observable<string>;

  constructor(private dialog: MatDialog, private renderer: Renderer2) { 
    this.inputObservable = this.newItemInputControl.valueChanges.pipe(
      filter(value => value !== null), // Filter out null values
      map(value => value || ''), // Map null values to an empty string
      debounceTime(300), // Adjust the debounce time as needed
      distinctUntilChanged()
    );

    this.inputObservable.subscribe((inputValue: string) => {
      if(!this.isToSubmit){
        for(let item of this.items){
          if(item.title === inputValue){
            this.isValidInput = !this.isValidInput;
            this.submitInput(item.url, item.title, item.input);
          } else {
            this.isValidInput = false;
          }
        }
      }
    });
  }

  onMouseOver(direction: string, isHovered: boolean) {
    if (direction === 'left') {
      this.animationState = 'left';
      this.isIconLeftHovered = isHovered;
    } else if (direction === 'right') {
      this.animationState = 'right';
      this.isIconRightHovered = isHovered;
    }
  }

  onMouseOut(direction: string, isHovered: boolean) {
    this.animationState = '';
    if (direction === 'left') {
      this.isIconLeftHovered = isHovered;
    } else if (direction === 'right') {
      this.isIconRightHovered = isHovered;
    }
  }

  getVideoThumbnailUrl(videoUrl?: string | null): string {
    const videoIdPattern = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
    const match = videoUrl?.match(videoIdPattern);
  
    if (match && match[1]) {
      // Remove anything after '&' character
      const videoId = match[1].split('&')[0];
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
  
    return '';
  }

  resetInputChild(){
    this.newItemInputControl.setValue("");
  }
  

  removeItem(item: Video) {
    const index = this.items.indexOf(item);
    if (index!== -1) {
      this.items.splice(index, 1);
    }
  }

  addItem() {
    this.showForm =!this.showForm; // set showForm to true when add button is clicked
    const dialogRef = this.dialog.open(NewVideoDialogComponent, {
      width: '500px',
      data: {
        url: this.newItemUrlControl.value,
        title: this.newItemTitleControl.value,
        input: this.newItemInputControl.value
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.items.push(item);
        this.newItemUrlControl.setValue(item.url);
        this.newItemTitleControl.setValue(item.title);
        this.newItemInputControl.setValue(item.input);
      }
      this.showForm =!this.showForm
    });
  }

  nextItem() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.setControlsValue();
      this.cardState = 'out'; // Slide out the current card
      setTimeout(() => {
        this.animationState = 'start'; // Reset the animation state after a short delay
        this.cardState = 'in'; // Slide in the new card
      }, 700);
    }
    this.resetInputChild();
  }

  setControlsValue(){
    this.newItemUrlControl.setValue(this.items[this.currentIndex].url);
    this.newItemTitleControl.setValue(this.items[this.currentIndex].title);
    this.newItemInputControl.setValue(this.items[this.currentIndex].input);
  }

  previousItem() {
    if (this.currentIndex > 0) {
      setTimeout(() => {
        this.currentIndex--;
        this.setControlsValue();
      }, 700);
    }
    this.resetInputChild();
  }

  redirectChildView(index: number) {
    this.currentIndex = index;
    this.isTutor =!this.isTutor;
  }

  toggleToggleVisibility() {
    this.showToggle = !this.showToggle;
  }
  

  submitInput(url: string | null, title: string | null, input: string | null) {
    if(title == input) this.isValidInput = true;
    if (this.isValidInput) {
      const item = this.items.find(item => item.url === url && item.title === title);
      if (item) {
        if (item.input) {
          item.input = input;
          this.currentIndex++;
        } else {
          this.animationState = 'end'; // Trigger the animation
          setTimeout(() => {
            this.animationState = 'start'; // Reset the animation state after a short delay
          }, 700);
        }
      }
  
      // Open the PlayVideoComponent or handle errors here
      const dialogRef = this.dialog.open(PlayVideoComponent, {
        width: '70%',
        height: '70%',
        data: {
          videoUrl: url
        }});
    } else {
      // Handle error or inform the user that input doesn't match any item title
    }
    this.isValidInput = false;
  }

  importFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target?.result as string;
        this.parseFileContents(fileContents);
      };

      reader.readAsText(file);
    }
  }

  parseFileContents(fileContents: string) {
    const lines = fileContents.split(/[\r\n]+/);
    const videos: Video[] = [];
  
    for (const line of lines) {
      const parts = line.split(' ');
      if (parts.length >= 2) {
        const url = parts[0];
        const title = parts.slice(1).join(' ').replace(/"/g, ''); // Remove double quotes
        videos.push({ url, title, input: '' });
      }
    }
  
    // Add the parsed videos to your items array
    this.items = videos;
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
      data: {
        showToggle: this.showToggle,
        isTutor: this.isTutor,
        isToSubmit: this.isToSubmit,
        items: this.items,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update your component properties based on the result if needed
        this.showToggle = result.showToggle;
        this.isTutor = result.isTutor;
        this.isToSubmit = result.isToSubmit;
        this.items = result.items;
      }
    });
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event, index: number): void {
    if (event.target instanceof HTMLElement) {
      const element = event.target as HTMLElement;
      const parentElement = element.parentElement;

      if (parentElement) {
        const children = parentElement.children;
        this.hoveredCardIndex = index;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hoveredCardIndex = null;
  } 

  editItem(item: Video) {
    const dialogRef = this.dialog.open(NewVideoDialogComponent, {
      width: '500px',
      data: {
        url: item.url,
        title: item.title,
        input: item.input,
        isEdition: true
      }
    });
  
    dialogRef.afterClosed().subscribe(updatedItem => {
      if (updatedItem) {
        // Update the item with the edited values
        item.url = updatedItem.url;
        item.title = updatedItem.title;
        item.input = updatedItem.input;
        // Optionally, you can save the updated item to your data source.
      }
    });
  }

  redirectToParent() {
    this.isTutor = !this.isTutor;
    this.resetInputChild();
  }
}

