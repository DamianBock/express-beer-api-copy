import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHausComponent } from './create-haus.component';

describe('CreateHausComponent', () => {
  let component: CreateHausComponent;
  let fixture: ComponentFixture<CreateHausComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHausComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
