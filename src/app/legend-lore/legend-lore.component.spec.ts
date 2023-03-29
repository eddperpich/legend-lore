import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendLoreComponent } from './legend-lore.component';

describe('LegendLoreComponent', () => {
  let component: LegendLoreComponent;
  let fixture: ComponentFixture<LegendLoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendLoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendLoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
