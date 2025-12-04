import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableListComponent } from './table-list.component';
import { SharedTestingModule } from '../../test-helpers/shared-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      declarations: [TableListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
