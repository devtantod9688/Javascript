import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let mockPhotoService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppComponent],
      providers: [
        { provide: ApiService, useValue: spy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    mockPhotoService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'api_js' title`, () => {
    expect(component.title).toEqual('api_js');
  });

  it('should fetch and display photos', async () => {
    fixture.detectChanges();
    await fixture.whenStable(); 
    expect(component.photos.length).toBe(5000);
    await fixture.whenStable(); 
    expect(component.photos[0].albumId).toEqual(1);
  });
}); 