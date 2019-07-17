import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../models/Track';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() track: Track = null;
  constructor() { }

  ngOnInit() {
  }

}
