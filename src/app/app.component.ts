
/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Nigel Andrews Student ID: 032805152 Date: Friday, August 13,2021
*  Online Link to Music App: https://friendly-almeida-861e96.netlify.app
*
*  Online Link to User Api: https://serene-shore-58648.herokuapp.com/api/users
*
********************************************************************************/ 


import { Component, OnInit} from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'music-app';
  searchString: string;
  public token : any;
  constructor(private router: Router, private auth : AuthService){}

  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
    }
    
    ngOnInit(){
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
          this.token = this.auth.readToken();
        }
      });
      
    };

    logout() : void{
      localStorage.clear();
      this.auth.logout()
      this.router.navigate(['/login']);
    }


}
