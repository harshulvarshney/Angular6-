import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ng7-with-material-design';
  links: Array<{ text: string, path: string }> = [];

  constructor () {
    this.links = [
      { 
        text: 'Data Table', 
        path: 'table' 
      }
    ];
    console.log('Initializing App Component');
  }

  ngOnInit(): void {
    console.log('initializing app-component and loading cachable objects');
    
  }

}
