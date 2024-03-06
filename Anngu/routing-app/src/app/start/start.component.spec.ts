import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Start } from './start.component';

describe('FirstComponent', () => {
  let component: Start;
  let fixture: ComponentFixture<Start>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Start ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Start);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
