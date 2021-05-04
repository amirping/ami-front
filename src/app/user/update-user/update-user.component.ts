import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private snackbar:MatSnackBar,private token:TokenStorageService,private routes:ActivatedRoute,private router:Router,private userService:UserService) { }
  isSuccessful=false;
  isSignUpFailed=false;
  id:any;
  list:any;
  user:any
  role:any;
  username:any;
  
  test:boolean=false;
  ngOnInit(): void {

    this.user=this.token.getUser();
    // this.user=new User();
    
    this.id=this.routes.snapshot.params['id'];
    console.log(this.id);
    
    this.list=this.userService.getUserById(this.id).subscribe(
      data=>{
        console.log(this)
        this.user=data;
        console.log(this.user);
      }
    )
    console.log(this.user);
    
  }

  onFileSelected(event){
    let file=event.target.files[0];
    let reader=new FileReader();
    reader.onload=(e)=>{
      this.user.img=reader.result.toString();
    }
  }
  onItemChange(){
    
    if(this.user.role.toUpperCase()=="particulier")
    {
      this.test=true;
      console.log(this.test);
      return this.test;
    }
    else{
      this.test=false;
      console.log(this.test);
      return this.test;
    }
  }
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{
      duration:2000
    })
  }
 updateUser(){
   this.userService.updateUser(this.id,this.user).subscribe(data=>
     console.log(data),error=>
     this.openSnackBar("Something went wrong ! ","OK")
       );
       this.user=new User();
       this.openSnackBar("User Updated Successfully","OK");
       this.router.navigate(['/home']);
     
   
 }
 onSubmit(){
   this.updateUser();
 }
}
