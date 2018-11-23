import { Component, OnInit } from '@angular/core';
import { LogService } from './log/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'tooth-protect';
  currentLocalStorage: string;


  constructor(private authService: LogService) {}


  ngOnInit() {
  }
}
