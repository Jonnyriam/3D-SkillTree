import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineComponent } from './engine.component';

describe('BranchComponent', () => {
  let component: EngineComponent;
  let fixture: ComponentFixture<EngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
