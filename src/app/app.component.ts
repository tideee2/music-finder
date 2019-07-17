import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchQuery = '';

  getSearchQuery(query: string) {
    console.log(query);
    this.searchQuery = query;
  }
}
