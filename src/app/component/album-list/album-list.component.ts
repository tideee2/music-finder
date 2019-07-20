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
  showLoader = false;
  @Input() searchQuery;
  constructor(private apiSrv: ApiService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.trackList = [];
    if (!changes.searchQuery.firstChange) {
      this.showLoader = true;
      this.getResults();
    }
  }

  getResults() {
    this.apiSrv.getComplexAlbum(this.searchQuery).subscribe( (data: Array<any>) => {
      console.log(data);
      console.log(data[0]);
      console.log(data[1]);
      this.showLoader = false;
      if (!this.isEmptyData(data)) {
        return;
      }
      console.log('???')
      data.forEach((element, index) => {
        console.log('+++')
        let temp;
        if (this.isITunesData(element)) {
          temp = this.iTunesConvert(element);
        }
        if (this.isDeezerData(element)) {
          temp = this.deezerConvert(element);
        }
        this.trackList = _.unionBy(this.trackList, temp, 'title', 'album', 'artist');
      });
      console.log('---------');
      console.log(this.trackList);
    });
  }

  isEmptyData(data: Array<any>): boolean {
    return !data[0] || !data[1] || !data[1].error || data[0].resultCount === 0;
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
