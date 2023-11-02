import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Video } from 'src/app/Models/video';

@Component({
  selector: 'app-new-video-dialog',
  templateUrl: './new-video-dialog.component.html',
  styleUrls: ['./new-video-dialog.component.css']
})
export class NewVideoDialogComponent {

  newItemUrlControl = new FormControl('');
  newItemTitleControl = new FormControl('');
  newItemInputControl = new FormControl('');

  url: string;
  title: string;
  input: string;
  isEdition: boolean;

  constructor(private dialogRef: MatDialogRef<NewVideoDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.url = data.url;
    this.title = data.title;
    this.input = data.input;
    this.isEdition = data.isEdition;
  }

  ngOnInit(){
    if(this.isEdition){
      this.newItemInputControl.setValue(this.data.input);
      this.newItemTitleControl.setValue(this.data.title);
      this.newItemUrlControl.setValue(this.data.url);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    const item: Video = {
      url: this.newItemUrlControl.value,
      title: this.newItemTitleControl.value,
      input: ''
    };
    this.dialogRef.close(item);
  }
}