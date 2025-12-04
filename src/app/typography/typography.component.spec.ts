import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypographyComponent } from './typography.component';
import { SharedTestingModule } from '../../test-helpers/shared-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      declarations: [TypographyComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
