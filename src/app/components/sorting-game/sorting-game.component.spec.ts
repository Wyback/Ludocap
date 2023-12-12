/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SortingGameComponent } from './sorting-game.component';

describe('SortingGameComponent', () => {
  let component: SortingGameComponent;
  let fixture: ComponentFixture<SortingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
