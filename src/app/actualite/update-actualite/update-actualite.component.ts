import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-update-actualite',
  templateUrl: './update-actualite.component.html',
  styleUrls: ['./update-actualite.component.css']
})
export class UpdateActualiteComponent implements OnInit {
  id:any;
  actualite:Actualite;
  img:any;
  constructor(private snackbar:MatSnackBar,private actualiteService:ActualiteService,private router:Router,private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.actualite= new Actualite();
    this.id=this.routes.snapshot.params['id'];
    console.log(this.id);
    this.actualiteService.getActualiteById(this.id).subscribe(data=>{
      this.actualite=data
      // console.log(this.actualite);
    })


  }
  onFileSelected(event){
    let file=event.target.files[0];
    let reader= new FileReader();
    console.log(reader.readAsDataURL(file));
    reader.onload=(e)=>{
      this.img=reader.result.toString();
      this.actualite.img=this.img;
    }
    
    
  }

  updateActualite(){
    this.actualiteService.updateActualite(this.id,this.actualite).subscribe(data=> {
      this.openSnackBar("Updated Successfully","ok")
      console.log(data)}
      ,error=>{
        this.openSnackBar("Update Failed ! ","ok")
        console.log(error)});
        this.actualite=new Actualite();
        this.router.navigate(['/home']);
  }
onSubmit(){
  this.updateActualite();
}
openSnackBar(message:string,action:string){
  this.snackbar.open(message,action,{
    duration:2000
  })
}
  
}
