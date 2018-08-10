import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringParserComponent } from './string-parser.component';

describe('StringParserComponent', () => {
  let component: StringParserComponent;
  let fixture: ComponentFixture<StringParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
