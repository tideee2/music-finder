import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Track} from '../../models/Track';
import {ApiService} from '../../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnChanges {

  trackList: Track[] = [];
  @Input() searchQuery;
  constructor(private apiSrv: ApiService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.getResults();
  }

  getResults() {
    this.apiSrv.getComplexAlbum(this.searchQuery).subscribe( data => {
      console.log(data[0]);
      console.log(data[1]);
      // if (!data[0] || !data[1] || !data[1].error || data[0].resultCount === 0) {
      //   return false;
      // }
      if (this.isITunesData(data[0])) {
        console.log(this.iTunesConvert(data[0]));
      }
      if (this.isDeezerData(data[1])) {
        console.log(this.deezerConvert(data[1]));
      }
      console.log('---------');
      this.trackList = _.unionBy(this.iTunesConvert(data[0]), this.deezerConvert(data[1]), 'title', 'album', 'artist');
      console.log(this.trackList);
    });
  }

  iTunesConvert(list): Track[] {
    return list.results.map(track => {
      return  {
        album: track.collectionName,
        title: track.trackName,
        image: track.artworkUrl100,
        artist: track.artistName,
        link: track.trackViewUrl
      } as Track;
    });
  }
  deezerConvert(list): Track[] {
    return list.data.map(track => {
      return {
        album: track.album.title,
        artist: track.artist.name,
        image: track.album.cover_big,
        link: track.link,
        title: track.title
      } as Track;
    });
  }
  isITunesData(list): boolean {
    return list.hasOwnProperty('resultCount') && list.hasOwnProperty('results');
  }
  isDeezerData(list): boolean {
    return list.hasOwnProperty('data') && list.hasOwnProperty('total') && list.hasOwnProperty('next');
  }

}
