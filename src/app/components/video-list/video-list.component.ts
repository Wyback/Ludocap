import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Video } from '../../Models/video';
import { PlayVideoComponent } from './play-video/play-video.component';
import { FormControl } from '@angular/forms';
import { NewVideoDialogComponent } from './new-video-dialog/new-video-dialog.component';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations'; // Add this line
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-video-prompt',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  animations: [
    trigger('cardHover', [
      state('notHovered', style({ transform: 'scale(1)', backgroundColor: '#c9a0dc', color: 'antiquewhite' })),
      state('hovered', style({ transform: 'scale(1.1)', backgroundColor: '#ae8abf', color: 'antiquewhite', zIndex: 1 })),
      transition('* => hovered', animate('300ms ease-in')),
      transition('hovered => notHovered', animate('300ms ease-out')),
    ]),    
  ],
})
export class VideoListComponent implements OnInit {
  items: Video[] = [];
  formControls = {
    newItemUrl: new FormControl(''),
    newItemTitle: new FormControl(''),
    newItemInput: new FormControl(''),
  };
  showForm = false;
  isTutor = true;
  currentIndex = 0;
  isIconLeftHovered = false;
  isIconRightHovered = false;
  cardState = 'in';
  showToggle = false;
  isToSubmit = false;
  isValidInput = false;
  hoveredCardIndex: number | null = null;
  inputObservable: Observable<string>;

  constructor(private dialog: MatDialog) {
    this.inputObservable = this.formControls.newItemInput.valueChanges.pipe(
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

  ngOnInit() {}

  getVideoThumbnailUrl(videoUrl?: string | null): string {
    const videoIdPattern = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
    const match = videoUrl?.match(videoIdPattern);
  
    if (match && match[1]) {
      const videoId = match[1].split('&')[0];
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
  
    return '';
  }

  handleResetInput(isResetInput: boolean){
    if(isResetInput) this.formControls.newItemInput.setValue("");
  }
  

  removeItem(item: Video) {
    const index = this.items.indexOf(item);
    if (index!== -1) {
      this.items.splice(index, 1);
    }
  }

  addItem() {
    this.showForm =!this.showForm;
    const dialogRef = this.dialog.open(NewVideoDialogComponent, {
      width: '500px',
      data: {
        url: this.formControls.newItemUrl.value,
        title: this.formControls.newItemTitle.value,
        input: this.formControls.newItemInput.value
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.items.push(item);
        this.formControls.newItemUrl.setValue(item.url);
        this.formControls.newItemTitle.setValue(item.title);
        this.formControls.newItemInput.setValue(item.input);
      }
      this.showForm =!this.showForm
    });
  }

  nextItem() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.setControlsValue();
    }
    this.handleResetInput(true);
  }

  setControlsValue(){
    this.formControls.newItemUrl.setValue(this.items[this.currentIndex].url);
    this.formControls.newItemTitle.setValue(this.items[this.currentIndex].title);
    this.formControls.newItemInput.setValue(this.items[this.currentIndex].input);
  }

  previousItem() {
    if (this.currentIndex > 0) {
      setTimeout(() => {
        this.currentIndex--;
        this.setControlsValue();
      }, 700);
    }
    this.handleResetInput(true);
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
          setTimeout(() => {
          }, 700);
        }
      }
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
    this.items = videos;
  }

  openSettingsDialog(isToOpen: boolean) {
    if(isToOpen) {
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
          this.showToggle = result.showToggle;
          this.isTutor = result.isTutor;
          this.isToSubmit = result.isToSubmit;
          this.items = result.items;
        }
      });
    }
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
        item.url = updatedItem.url;
        item.title = updatedItem.title;
        item.input = updatedItem.input;
      }
    });
  }

  handleViewChange(isViewChanged: boolean) {
    if(isViewChanged) {
      this.isTutor = !this.isTutor;
      this.handleResetInput(true);
    }
  }

}

