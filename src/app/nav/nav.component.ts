import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { isEmpty, map, shareReplay } from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {io} from 'socket.io-client';

import { UserService } from '../services/user.service';
import { Notification } from '../models/notification';
import { Reclamation } from '../models/reclamation';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  socket:any;
  user2?:any;
  data?;
  notification:Notification;
  sender:any;
  List=[];
  not=0;
  user:User;
  check:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private userService:UserService,private breakpointObserver: BreakpointObserver,private router:Router,private tokenStorageService: TokenStorageService) {
    this.socket=io('http://localhost:8080',{
      withCredentials:false,
    });
  }
  
  ngOnInit():void{

    this.socket.on('notification',data=>{
      this.data=data;
      
      // this.not++;
      // this.List.push(data);
      console.log(this.List);
      this.userService.getUserById(this.data.user).subscribe(data=>{
        this.user2=data;
        console.log(this.user2);
        if(this.user2._id!=this.data.user || this.tokenStorageService.getUser().roles.includes("ROLE_ADMIN")){
          this.not++;
          // this.List.push(data);
          this.notification=new Notification(this.data._id,this.user2._id,this.user2.username,this.user2.img,this.data.reclamation,this.data.code,this.data.updatedAt,this.data.etape,this.data.updatedAt);
          this.List.push(this.notification);
          console.log(this.List);
        }
      })
    })
    
   this.user=this.tokenStorageService.getUser();
   this.rolesCheck();
   
  }

  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['/login']);
    
  }
  rolesCheck(){
    if(this.tokenStorageService.getUser().roles.includes("ROLE_ADMIN")){
      this.check=true;
      return this.check;
      
    }
    else return this.check;
  }
  Testing(){
    this.not=0;
  }
 detail(id:any){
    this.router.navigate(['detailreclamation/'+id]);
 }


}
