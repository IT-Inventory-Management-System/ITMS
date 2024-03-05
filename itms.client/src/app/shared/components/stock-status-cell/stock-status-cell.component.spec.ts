import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStatusCellComponent } from './stock-status-cell.component';

describe('StockStatusCellComponent', () => {
  let component: StockStatusCellComponent;
  let fixture: ComponentFixture<StockStatusCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockStatusCellComponent]
    });
    fixture = TestBed.createComponent(StockStatusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
