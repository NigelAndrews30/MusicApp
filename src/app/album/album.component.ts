import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  private albumSub: any;
  private routeSub: any;
  private favouritesSub : any;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.albumSub = this.musicData.getAlbumById(params['id']).subscribe(data => {
        this.album = data;
      });
    });

  }

  addToFavourites(id) {
    this.favouritesSub = this.musicData.addToFavourites(id).subscribe(success=>{
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
  
    },(err)=>{
      this.snackBar.open("Unable to add song to Favourites...", "Done", { duration: 1500 });
    });
     
  }

  
  

  ngOnDestroy(): void{
    this.albumSub?.unsubscribe();
    this.routeSub?.unsubscribe();
    this.favouritesSub?.unsubscribe();
  }
}
