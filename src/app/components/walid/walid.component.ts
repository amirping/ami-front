import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActualiteService } from 'src/app/services/actualite.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Actualite} from './../../models/actualite';
import { Router } from '@angular/router';
@Component({
  selector: 'app-walid',
  templateUrl: './walid.component.html',
  styleUrls: ['./walid.component.css']
})
export class WalidComponent implements OnInit {
  img:any;
  addActualite:FormGroup;
  Actualite=new Actualite();
  constructor(private add:FormBuilder,private router:Router,private actualiteService:ActualiteService) { 


  }

  ngOnInit(): void {
    this.addActualite=this.add.group({
      title:['',Validators.required],
      description:['',Validators.required],
      img:['',Validators.required]
    })
    
  }

  onSubmit(){
      console.log(this.addActualite.value);
      // inputNode.value = fileInput.value.replace("C:\\fakepath\\", "");
      
      this.actualiteService.addActualite(this.addActualite.value).subscribe(data=>{
        this.router.navigate(['home']);
      })
  }

}
