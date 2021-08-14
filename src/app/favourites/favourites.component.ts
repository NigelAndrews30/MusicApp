import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any>

  private favouriteSub: any;
  private removeFavouriteSub: any;

  constructor(private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.favouriteSub = this.musicData.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id){
    this.removeFavouriteSub = this.musicData.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void{
    this.favouriteSub?.unsubscribe();
    this.removeFavouriteSub?.unsubscribe();
  }

}
