import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.css']
})
export class PlayVideoComponent implements OnInit {

  videoUrl?: string;
  urlSafe?: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const videoId = this.data.videoUrl.split('v=')[1];
    this.videoUrl = `http://www.youtube.com/embed/${videoId}?autoplay=1`
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

}
