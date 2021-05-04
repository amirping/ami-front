import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          
          chart: { cols: 1, rows: 2 },
          
        };
      }
 
     return {
        columns: 1,
        
        chart: { cols: 2, rows: 2 },
        
      };
    })
  );
  currentUser:any;
  // username?:string;
 
  test:User;
  id:any;
  check:boolean=false;
  constructor(private router:Router,private userService:UserService,private token:TokenStorageService,private breakpointObserver:BreakpointObserver) { }

  ngOnInit(): void {
    
    this.currentUser=this.token.getUser();
    // this.username=this.currentUser.username;
    
    console.log(this.currentUser.id)
    this.userService.getUserById(this.currentUser.id).subscribe(data=>{
      this.currentUser=data;
      
      
    }
    
    )
    
    this.RolesCheck();
  }
  consultUser(id:string,user:User){
    this.router.navigate(['updateuser/'+id]);


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

}
