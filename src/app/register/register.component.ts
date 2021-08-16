import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  public registerUser : RegisterUser = {
    userName: "bob",
    password: "",
    password2: ""
  };
  public warning : any;
  public success : boolean = false;
  public loading : boolean = false;
  public authSub : any;
  constructor(private auth : AuthService) { }



  ngOnInit(): void {
    
  }
  
  onSubmit(f: NgForm) : void{
    console.log
    if(this.registerUser.userName && this.registerUser.password === this.registerUser.password2){
      this.loading = true;
      this.authSub  = this.auth.register(this.registerUser).subscribe((data)=>{
        this.success = true;
        this.warning = null;
        this.loading = false;
      }, (err) =>{
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      });
    }
  }

  ngOnDestroy() : void{
    this.authSub?.unsubscribe();
  }
}
