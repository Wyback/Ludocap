import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NewVideoDialogComponent } from './components/video-list/new-video-dialog/new-video-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayVideoComponent } from './components/video-list/play-video/play-video.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './components/video-list/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselModule } from '@coreui/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HouseGameComponent } from './components/house-game/house-game.component';
import { HouseItemListComponent } from './components/house-game/house-item-list/house-item-list.component';
import { HouseComponent } from './components/house-game/house/house.component';
import { HouseItemComponent } from './components/house-game/house-item-list/house-item/house-item.component';
import { SquareComponent } from './components/house-game/square/square.component';
import { RoomComponent } from './components/house-game/room/room.component';

@NgModule({
  declarations: [	
    AppComponent,
    VideoListComponent,
    NewVideoDialogComponent,
    PlayVideoComponent,
    SettingsComponent,
    HeaderComponent,
    HouseGameComponent,
    HouseItemListComponent,
    HouseItemComponent,
    HouseComponent,
    SquareComponent,
    RoomComponent
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
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
