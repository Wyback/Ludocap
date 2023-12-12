import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isTutorView: boolean = true;

  @Output() isSettingsToOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() isViewChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openSettingsDialog() {
    this.isSettingsToOpen.emit(true);
  }

  triggerTutorView() {
    this.isTutorView = !this.isTutorView;
    this.isViewChanged.emit(this.isTutorView);
  }

  launchSortGame() {
    this.router.navigate(['/sorting-game']);
  }
}
