import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcarComponent } from './addcar.component';
import { SharedTestingModule } from '../../test-helpers/shared-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddcarComponent', () => {
  let component: AddcarComponent;
  let fixture: ComponentFixture<AddcarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      declarations: [AddcarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
