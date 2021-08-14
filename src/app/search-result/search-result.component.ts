import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: string;

  private querySub: any;
  private artistsSub: any;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.querySub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];

      this.artistsSub = this.musicData.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter(x=>x.images.length > 0);
      });
    });
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
    this.artistsSub?.unsubscribe();
  }

}
