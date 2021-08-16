import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public user : User = {
    _id : null,
    userName : "",
    password : ""
  };
  public warning : any;
  public loading : boolean = false;
  private authSub : any;
  constructor(private auth : AuthService, private route : Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) : void{
    if(this.user.userName && this.user.password){
      this.loading = true;
      this.authSub = this.auth.login(this.user).subscribe(data=>{
        this.loading = false;
        localStorage.setItem('access_token', data.token);
        this.route.navigate(['/newReleases']);
      },(err) =>{
        this.warning = err.error.message;
        this.loading = false;
      });
    }
  }

  ngOnDestroy() : void {
    this.authSub?.unsubscribe();
  }

}
