import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Haus_Detail } from './haus-detail.component';

describe('Haus_Detail ', () => {
  let component: Haus_Detail
  let fixture: ComponentFixture<Haus_Detail >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Haus_Detail  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Haus_Detail );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
