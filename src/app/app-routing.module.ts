import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent } from './components/video-list/video-list.component';
import { HouseGameComponent } from './components/house-game/house-game.component';

const routes: Routes = [
  { path: 'video-prompt', component: VideoListComponent },
  { path: 'sorting-game', component: HouseGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: []
})
export class AppRoutingModule { }
