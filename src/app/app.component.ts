import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ButtonModule, DataViewModule, CardModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'api_js';
  photos: any[] = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.getData().subscribe({
      next: (data: any) => {
        this.photos = data;
        console.log(this.photos);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => console.log("Response Completed.")
    });
  }


}
