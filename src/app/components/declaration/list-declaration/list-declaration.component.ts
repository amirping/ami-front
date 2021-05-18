import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
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
import { Declaration } from 'src/app/models/declarations';
import { DeclarationService } from 'src/app/services/declaration.service';
@Component({
  selector: 'app-home',
  templateUrl: './list-declaration.component.html',
  styleUrls: ['./list-declaration.component.css']
})
export class ListDeclarationComponent implements OnInit {
  content?:string;
  list:any;
  id:any;
  declaration:Declaration;
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

  constructor(private tokenStorageService:TokenStorageService,private modalService:BsModalService,private userService:UserService,private breakpointObserver:BreakpointObserver,private router:Router,private declarationService:DeclarationService) { }
  
  i=0;
  reloadData(){
    this.declarationService.getDeclarationList().subscribe(
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
    if(this.check){
      // load all 
      // this.declarationService.getDeclarationList().subscribe( data => {
      //   this.list = data;
        
      // }, err => {
      //   console.log(err)
      //   alert('issue loading data')
      // })
      this.reloadData()
    } else {
      this.userService.getPublicContent().subscribe(
        data=>{
          this.content=data;
          console.log(this.content);
        },
        err=>{
          console.log("error")
          
        }
      );
    }
    // this.reloadData();
  }

  consult(id:string,actualite:Actualite){
    this.id=id;
    console.log(id);  
    this.router.navigate(['updateactualite/'+id]);
  }
  template:TemplateRef<any>;
  delete(id:string,actualite:Actualite){
    this.declarationService.getDeclarationById(id).subscribe(
      data=>{
        actualite=data
        console.log(id);
        this.reloadData();
        this.modalRef.hide();
      }
    )
    this.declarationService.deleteDeclaration(id).subscribe(
      data=>{this.list=this.list.filter(u=>u!==this.declaration);
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
