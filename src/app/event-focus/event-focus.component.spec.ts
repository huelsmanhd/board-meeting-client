import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFocusComponent } from './event-focus.component';

describe('EventFocusComponent', () => {
  let component: EventFocusComponent;
  let fixture: ComponentFixture<EventFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
