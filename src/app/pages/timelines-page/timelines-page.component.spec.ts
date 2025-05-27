import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesPageComponent } from './timelines-page.component';

describe('TimelinesPageComponent', () => {
  let component: TimelinesPageComponent;
  let fixture: ComponentFixture<TimelinesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
