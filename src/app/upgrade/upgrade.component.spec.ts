import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpgradeComponent } from './upgrade.component';
import { SharedTestingModule } from '../../test-helpers/shared-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UpgradeComponent', () => {
  let component: UpgradeComponent;
  let fixture: ComponentFixture<UpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      declarations: [UpgradeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeComponent);
    component = fixture.componentInstance;
    // avoid running change detection / ngOnInit for isolation while debugging
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
