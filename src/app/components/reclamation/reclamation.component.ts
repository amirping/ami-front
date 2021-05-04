import { Component, OnInit } from '@angular/core';
import {StepperSelectionEvent, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReclamationService} from './../../services/reclamation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Ticket } from 'src/app/models/ticket';
import { Reclamation } from 'src/app/models/reclamation';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css'],
  providers:[{provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}]
})
export class ReclamationComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = true;
  test:any;
  titre:any;
  description:any;
  categorie:any;
  categories:any;
  value:any;
  submitted:boolean=false;
  ticket:any;
  reclamation:Reclamation=new Reclamation();
  constructor(private _formBuilder: FormBuilder,private reclamationService:ReclamationService,private userService:TokenStorageService) { }


  newTicket():void{
    this.submitted=false;
    // this.ticket=new Ticket(this.userService.getUser().id);
  }

  ngOnInit(): void {

    this.reclamationService.code().subscribe();
    this.firstFormGroup = this._formBuilder.group({
      categorie: ['', Validators.required],
      titre: ['',Validators.required],
      description: ['',Validators.required],
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   // secondCtrl: [this.titre, Validators.required]
    // });
    this.reclamationService.getCategories().subscribe(data=>{
      console.log(data);
      this.categories=data;
    })
    // console.log(this.userService.getUser().id);
    console.log(this.reclamation);
  }


  onSubmit(){
    this.ticket=new Ticket(this.userService.getUser().id);
    this.submitted=true;
    this.reclamationService.addReclamation(this.ticket).subscribe(
      data=>{
        console.log(data);
 
        this.reclamationService.updateReclamation(data._id,this.reclamation).subscribe(data2=>{
          console.log(data2);
        },error=>{
          console.log(error);
        })
        window.location.reload();
      },
      error=>{console.log(error)},
    
      );
    
  }
  test2(){
    alert('test');
  }
}
