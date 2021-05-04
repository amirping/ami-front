import { Component, OnInit,AfterViewInit } from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';
import {io} from 'socket.io-client';
import {AuthInterceptor} from './../helpers/auth_interceptor';
import { ActualiteService } from './services/actualite.service';
import { HttpHeaders,HTTP_INTERCEPTORS } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private roles:string[]=[];
  private socket:any;
  private data:any; 
  isLoggedIn=false;
  isLoading:boolean=false;
  showAdminBoard=false;
  showModeratorBoard=false;
  username?:string;
  regis:boolean;
  test:string;

  constructor(private tokenStorageService:TokenStorageService,private actualiteService:ActualiteService){
    this.socket = io('http://localhost:8080',{
      withCredentials:false,
    });

  }

  ngOnInit():void {
    
   this.socket.connect()
    this.socket.on('notification', data => {
      this.data = data;
      console.log(data);
    });
    

    if(window.sessionStorage.getItem('test')==null){
      window.sessionStorage.setItem('test','register');}
    this.getTest();
    this.isLoggedIn=!!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user=this.tokenStorageService.getUser();
      this.roles=user.roles;
      this.showAdminBoard=this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard=this.roles.includes('ROLE_MODERATOR');
      this.username=user.username;
      this.isLoading=true;
    }
    
    
  

  }
  ngAfterViewInit():void{
    this.isLoading=false;
  }
  logout():void{
    window.sessionStorage.removeItem('test');
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  getTest(){
   this.test= window.sessionStorage.getItem('test');
    console.log(this.test)
  }
}
