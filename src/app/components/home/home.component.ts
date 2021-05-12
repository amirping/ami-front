import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Actualite } from 'src/app/models/actualite';
import { Router } from '@angular/router';
import { ActualiteService } from 'src/app/services/actualite.service';
import { BsModalService,BsModalRef} from  'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/user';
import * as $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?:string;
  list:any;
  id:any;
  actualite:Actualite;
  modalRef:BsModalRef;
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

  constructor(private tokenStorageService:TokenStorageService,private modalService:BsModalService,private userService:UserService,private breakpointObserver:BreakpointObserver,private router:Router,private actualiteService:ActualiteService) { }
  
  i=0;
  reloadData(){
    this.userService.getActualiteList().subscribe(
      data=>{
        this.list=data;
        while(this.i<1){
          this.ngOnInit();
          this.i++;
        }
        console.log(this.list);
        
      },
      err=>{
        console.log('error')
      }
    )
  }

  ngOnInit(): void {

    this.RolesCheck();
    this.userService.getPublicContent().subscribe(
      data=>{
        this.content=data;
        console.log(this.content);
      },
      err=>{
        console.log("error")
        
      }
    );
      
      
      
    // this.userService.getActualiteList().subscribe(
    //   data=>{
    //     this.list=data;
    //     console.log(this.list);
    //   },
    //   err=>{
    //     console.log(err=>({message:"Error while getting the list"}));
    //   }
    // )
    this.reloadData();
  }

  consult(id:string,actualite:Actualite){
    this.id=id;
    console.log(id);  
    this.router.navigate(['updateactualite/'+id]);
  }
  template:TemplateRef<any>;
  delete(id:string,actualite:Actualite){
   
    this.actualiteService.getActualiteById(id).subscribe(
      data=>{
        actualite=data
        console.log(id);
        this.reloadData();
        this.modalRef.hide();
      }
    )
    this.actualiteService.deleteActualite(id).subscribe(
      data=>{this.list=this.list.filter(u=>u!==this.actualite);
      console.log(data)},
      error=>console.log(error)
    );
  }


  openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);

  }
  closeModal(template:TemplateRef<any>){
    this.modalRef.hide();
  
  }
  check:boolean=false;
  RolesCheck(){
    //role_admin
    // console.log(this.tokenStorageService.getUser().roles);
    if(this.tokenStorageService.getUser().roles.includes("ROLE_ADMIN")){
      this.check=true;
      return this.check;
      
    }
    else return this.check;
  }
}
