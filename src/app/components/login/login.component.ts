import { Component, OnInit, Output,AfterViewInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarLoginComponent} from './../../helpers/snack-bar-login/snack-bar-login.component'
import {EventEmitter} from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading:boolean=false;
  duration=5;
  f:any;
 list;
  form:any={
    username:'',
    password:''
  };
  isLoggedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles:string[]=[];
  username:any;
  test:string;
  constructor(private snackbar:MatSnackBar,private authService:AuthService,private tokenStorage:TokenStorageService) { }

 
  ngOnInit(): void {
    setTimeout(()=>this.isLoading=true,1500)
    if(this.tokenStorage.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenStorage.getUser().roles;
    }
    
    
  }



  onTest(event){
    if(event.target){
      this.test='login'
      window.sessionStorage.removeItem('test');
      window.sessionStorage.setItem('test',this.test); 
      window.location.reload();
 
    }
  }


  onSubmit():void{

    
    const{username,password}=this.form;

    this.authService.login(username,password).subscribe(
      data=>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed=false;
        this.isLoggedIn=true;
        this.roles=this.tokenStorage.getUser().roles;
        
        this.reloadPage();
        this.openSnackBar("logged in successfuly !","ok");
      },
      err=>{
        this.errorMessage=err.error.message;
        this.isLoginFailed=true;
        
      }
    );this.openSnackBar("login failed try again !","ok");
  }

  reloadPage():void{
    window.location.reload();
  }
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{
      duration:2000
    })
  }

//   openSnackBar(message: string, action: string) {

//     if((this.isLoggedIn==false)||(this.form.value=='')){

//     this.snackbar.open("login failed try again !", "ok", {
//       duration: 2000,
//     });
//   }
//   else if((this.isLoginFailed==false)) {
//     this.snackbar.open("Loggged In Successfully","ok",{
//       duration:2000,

//     });
//   }
// }
}
