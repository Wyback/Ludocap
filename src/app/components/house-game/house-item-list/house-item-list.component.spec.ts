/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HouseItemListComponent } from './house-item-list.component';

describe('HouseItemListComponent', () => {
  let component: HouseItemListComponent;
  let fixture: ComponentFixture<HouseItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
