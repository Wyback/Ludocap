/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HouseGameComponent } from './house-game.component';

describe('HouseGameComponent', () => {
  let component: HouseGameComponent;
  let fixture: ComponentFixture<HouseGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
