import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  query = '';
  @Output() search = new EventEmitter<string>();
  constructor(private apiSrv: ApiService) { }

  ngOnInit() {
  }

  searchClick() {
    this.search.emit(this.query);
  }
}
