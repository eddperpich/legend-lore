import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElijahCoreComponent } from './elijah-core.component';

describe('ElijahCoreComponent', () => {
  let component: ElijahCoreComponent;
  let fixture: ComponentFixture<ElijahCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElijahCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElijahCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
