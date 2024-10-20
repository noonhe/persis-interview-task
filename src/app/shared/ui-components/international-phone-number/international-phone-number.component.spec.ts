import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPhoneNumberComponent } from './international-phone-number.component';

describe('InternationalPhoneNumberComponent', () => {
  let component: InternationalPhoneNumberComponent;
  let fixture: ComponentFixture<InternationalPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalPhoneNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
