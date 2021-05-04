import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import { WalidComponent } from '../../walid/walid.component';
import { EtapeReclamationComponent } from '../etape-reclamation/etape-reclamation.component';

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.css']
})
export class DetailReclamationComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  id:any;
  reclamation?:any;
  etape:any;
  constructor(public dialog: MatDialog,private reclamationService:ReclamationService,private router:Router,private routing:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.routing.snapshot.params['id'];
    console.log(this.id);
    this.reclamationService.getReclamationById(this.id).subscribe(data=>{
 
      this.reclamation=data;
      console.log(this.reclamation._id);
      this.reclamationService.getEtapeById(this.reclamation.ticket._id).subscribe(data1=>{
        this.etape=data1;
      })
      })
  }
  openDialog() {
    this.dialog.open(WalidComponent);
  }
  openEtapeDialog(){
    const dialogRef =this.dialog.open(EtapeReclamationComponent , {
      data:{id:this.id}
    });
  }


}
