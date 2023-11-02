import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPromptComponent } from './video-prompt/video-prompt.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NewVideoDialogComponent } from './video-prompt/new-video-dialog/new-video-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayVideoComponent } from './video-prompt/play-video/play-video.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './video-prompt/settings/settings.component';
import { CarouselModule } from '@coreui/angular';
@NgModule({
  declarations: [	
    AppComponent,
    VideoPromptComponent,
    NewVideoDialogComponent,
    PlayVideoComponent,
    SettingsComponent
  ],
  imports: [
    CarouselModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    ReactiveFormsModule, // add ReactiveFormsModule to imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
