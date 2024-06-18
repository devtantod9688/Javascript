import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', () => {
    const dummyPhotos = [
      { albumId: 1, id: 1, title: 'photo 1', url: 'url1', thumbnailUrl: 'thumbnailUrl1' },
      { albumId: 1, id: 2, title: 'photo 2', url: 'url2', thumbnailUrl: 'thumbnailUrl2' }
    ];

    service.getData().subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/photos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
