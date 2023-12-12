import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Video } from 'src/app/Models/video';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedFileName: string = ''; // Variable to store the selected file name
  items: Video[];
  isTutor: boolean;
  isToSubmit: boolean;
  isRedirectActivated: boolean;


  constructor(public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.items = this.data.items;
      this.isTutor = this.data.isTutor;
      this.isToSubmit = this.data.isToSubmit;
      this.isRedirectActivated = this.data.isRedirectActivated;
    }

  ngOnInit() {
  }

  ngOnClose() {
    this.sendDataToParent();
  }

  exportToFile() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  
    const fileName = `export_${formattedDate}.txt`;
  
    const content = this.items.map(video => `${video.url} "${video.title}"`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
  
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  importFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      this.selectedFileName = file.name; // Set the selected file name
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

  sendDataToParent() {
    const result = {
      isTutor: this.isTutor,
      isToSubmit: this.isToSubmit,
      items: this.items,
    };
    this.dialogRef.close(result);
  }

  // Toggle the isTutor state
  toggleIsTutor() {
    this.isTutor = !this.isTutor;
  }

  // Toggle the isToSubmit state
  toggleIsToSubmit() {
    this.isToSubmit = !this.isToSubmit;
  }

  toggleIsRedirectActivated() {
    this.isRedirectActivated = !this.isRedirectActivated;
  }

}
