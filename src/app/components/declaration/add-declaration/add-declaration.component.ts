import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActualiteService } from 'src/app/services/actualite.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Actualite} from '../../../models/actualite';
import { Router } from '@angular/router';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import {io} from 'socket.io-client/build/index';
import { Declaration } from 'src/app/models/declarations';
import { DeclarationService } from 'src/app/services/declaration.service';

@Component({
  selector: 'app-add-declaration',
  templateUrl: './add-declaration.component.html',
  styleUrls: ['./add-declaration.component.css']
})
export class AddDeclarationComponent implements OnInit {
  declaration:Declaration=new Declaration();
  img:string;
  title:any;
  addActualite:FormGroup;
  submitted:boolean=false;
  modalRef:BsModalRef;
 
  constructor(private modalService:BsModalService,private router:Router,private declarationService:DeclarationService) { 

  }

  ngOnInit(): void {
    console.log("hedi bhim");
 
  }

  newActualite():void {
    this.submitted=false;
    this.declaration=new Declaration();
  }


selectedFile=null;
onFileSelected(event){
  // console.log(event.target.files[0]);
  let file=event.target.files[0];
  let reader= new FileReader();
 console.log( reader.readAsDataURL(file));
  reader.onload=(e)=>{
    this.img=reader.result.toString();
    this.declaration.img=this.img
  }
  // console.log(event.target.files[0].path);
}


save(){
  this.declarationService.addDeclaration(this.declaration).subscribe(
    data=>{
      console.log(data);
    },
    error=>console.log(error)
  );
  this.declaration=new Declaration();
  
}

  onSubmit(){
      // console.log(this.addActualite.value);
      // // inputNode.value = fileInput.value.replace("C:\\fakepath\\", "");
      // this.addActualite.controls['img']=this.img;
      // console.log(this.addActualite.controls['img'].value);
      // this.actualiteService.addActualite(this.addActualite.value).subscribe(data=>{
      //   this.router.navigate(['home']);
      // })
      this.submitted=true;
      console.log(this.submitted);

      this.save();
  }
  openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
  }
  closeModal(template:TemplateRef<any>){
    this.modalRef.hide();
  }

}
