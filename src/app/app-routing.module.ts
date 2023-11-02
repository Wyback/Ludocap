import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPromptComponent } from './video-prompt/video-prompt.component';

const routes: Routes = [
  { path: 'video-prompt', component: VideoPromptComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: []
})
export class AppRoutingModule { }
