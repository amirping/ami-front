import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.css']
})
export class ConsultUserComponent implements OnInit {
  id:any;
  user:User=new User();
  obj:any;
  check:boolean=false;
  constructor(private router:Router,private routes:ActivatedRoute,private token:TokenStorageService,private userService:UserService) { }
  
  ngOnInit(): void {
    
    this.id=this.routes.snapshot.params['id'];
    console.log(this.id);
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data
      console.log( this.user.status)
    })
    
    this.test();
  }
  RolesCheck(){
    //role_admin
    // console.log(this.tokenStorageService.getUser().roles);
    if(this.token.getUser().roles[0]=="ROLE_ADMIN"){
      this.check=true;
      console.log(this.check);
      return this.check;
      
      
    }
    else console.log(this.check); return this.check;
  }

  test(){
    console.log(this.user);
  }
}
