import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent {
  weathers: Weather[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Weather[]>('https://localhost:5001/WeatherForecast').subscribe({
      next: (result: any) => {
        this.weathers = result;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
  
}
interface Weather {
  date: Date;
  temperatureC: string;
  temperatureF: string;
  summary: string;
}
