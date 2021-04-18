import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagePieComponent } from './damage-pie.component';

describe('DamagePieComponent', () => {
  let component: DamagePieComponent;
  let fixture: ComponentFixture<DamagePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagePieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
