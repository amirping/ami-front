import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Etape } from 'src/app/models/etape';
import { Ticket } from 'src/app/models/ticket';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-etape-reclamation',
  templateUrl: './etape-reclamation.component.html',
  styleUrls: ['./etape-reclamation.component.css']
})
export class EtapeReclamationComponent implements OnInit {

  constructor(private router:Router,public dialogRef: MatDialogRef<EtapeReclamationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private reclamationService:ReclamationService) { 

   
    }
  selectFormControl = new FormControl('', Validators.required);

  list=['onHold','active','paused','completed'];
  id=this.data.id;
  selectedName:any;
  etape:Etape;
  
  ngOnInit(): void {
  this.etape=new Etape();
   this.reclamationService.getReclamationById(this.id).subscribe(data=>{
     this.reclamationService.getEtapeById(data.ticket._id).subscribe(data=>{
       this.etape=data;
       this.selectedName=data.name;
       

     })
     
   }) 
  }
  updateEtape(){
    
    this.reclamationService.getReclamationById(this.id).subscribe(data=>{
      this.reclamationService.getEtapeById(data.ticket._id).subscribe(data1=>{
        this.etape.name=this.selectedName;
        this.etape.ticket=data.ticket._id;
        this.reclamationService.updateEtape(data.ticket._id,this.etape).subscribe(
          data2=>console.log(data2)
        );
      

    });
    
  }) ;
  }

 onSubmit(){
   this.updateEtape();
   this.router.navigate(["/consultreclamation"]);
  
}
onChange(x:any){
  this.etape.name=this.selectedName;
}

}
