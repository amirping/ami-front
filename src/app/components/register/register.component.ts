import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide:boolean=false;
  role:string;
// form:any={
//   username:null,
//   firstname:null,
//   lastname:null,
//   email:null,
//   role:null,
//   numtel:null,
//   numid:null,
//   roles:null,
//   password:null
// };
user:User=new User();
isSuccessful=false;
isSignUpFailed=false;
errorMessage='';
inscri:boolean;
submitted:boolean=false;
img:string;
  constructor(private snackbar:MatSnackBar,private authService:AuthService,private userService:UserService) { }

  ngOnInit(): void {
  }


  newUser():void{
    this.submitted=false;
    this.user=new User();
  }
  onFileSelected(event){
    let file=event.target.files[0];
    let reader=new FileReader();
    console.log(reader.readAsDataURL(file));
    reader.onload=(e)=>{
      this.img=reader.result.toString();
      this.user.img=this.img;
    }
  }

  save(){
    this.authService.register(this.user).subscribe(
      data=>{
        console.log(data);
        this.openSnackBar("Account Created successfully !" ,"ok");
      },
      error=>{
        this.openSnackBar("Account Created successfully !" ,"ok");
        console.log(error)
      }
      // error=>console.log(error)
    );
    this.user=new User();
  }

  onSubmit():void{
    this.submitted=true;
    console.log(this.submitted);
    this.save();
  }
  signUpForm(){
    this.hide=true;
    alert(this.hide);
  }
  onItemChange(value){
    console.log(value);
    if(value=="particulier"){
      this.inscri=false;console.log(this.inscri)
      return this.inscri;
      
    }
    else{
      this.inscri=true;
      console.log(this.inscri);
      return this.inscri
    }

  }
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{
      duration:2000
    })
  }
  test:string;
  onTest(event){
    if(event.target){
      this.test='register';
      window.sessionStorage.removeItem('test');
      window.sessionStorage.setItem('test',this.test);
      window.location.reload();

    }
  }

}
