import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hsk3Component } from './hsk3.component';

describe('Hsk3Component', () => {
  let component: Hsk3Component;
  let fixture: ComponentFixture<Hsk3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hsk3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hsk3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
