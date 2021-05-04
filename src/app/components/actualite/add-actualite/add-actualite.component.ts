import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActualiteService } from 'src/app/services/actualite.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Actualite} from './../../../models/actualite';
import { Router } from '@angular/router';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import {io} from 'socket.io-client/build/index';

@Component({
  selector: 'app-add-actualite',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.css']
})
export class AddActualiteComponent implements OnInit {
  actualite:Actualite=new Actualite();
  img:string;
  title:any;
  addActualite:FormGroup;
  submitted:boolean=false;
  modalRef:BsModalRef;
  Actualite=new Actualite();
 
  constructor(private modalService:BsModalService,private router:Router,private actualiteService:ActualiteService) { 

  }

  ngOnInit(): void {
    console.log("hedi bhim");
 
  }

  newActualite():void {
    this.submitted=false;
    this.actualite=new Actualite();
  }


selectedFile=null;
onFileSelected(event){
  // console.log(event.target.files[0]);
  let file=event.target.files[0];
  let reader= new FileReader();
 console.log( reader.readAsDataURL(file));
  reader.onload=(e)=>{
    this.img=reader.result.toString();
    this.actualite.img=this.img
  }
  // console.log(event.target.files[0].path);
}


save(){
  this.actualiteService.addActualite(this.actualite).subscribe(
    data=>{
      console.log(data);
    },
    error=>console.log(error)
  );
  this.actualite=new Actualite();
  
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
