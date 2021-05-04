import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Reclamation } from 'src/app/models/reclamation';
import { Ticket } from 'src/app/models/ticket';
import { ReclamationService } from 'src/app/services/reclamation.service';
import {NavigationEnd, Router} from '@angular/router';
import {TokenStorageService} from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'createdAt', 'etape', 'reclamation','Action'];
 list:any;
  dataSource : MatTableDataSource<any>;
  test:boolean=false;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private router:Router,private reclamationService:ReclamationService,private token:TokenStorageService) { 

  }

  
   public showContent:boolean=false;
  i=0;
  
  reloadData(){
    
    
    this.reclamationService.getA9bahFunction().subscribe(data1=>{
   
      data1.forEach(element => {
        if(this.i<1){
         console.log("qsdsqdsq");
          this.i++;
      }
        if(element.user._id==this.token.getUser().id){
         this.list=data1;
         this.dataSource=new MatTableDataSource(this.list);
         this.dataSource.paginator=this.paginator;
        
        }
          console.log(data1);
         
        
            
      }
      );
 
    });
  
 
  }


//   ngAfterViewInit() {
//     this.reloadData();
  
// }
ngOnInit():void{
 this.reloadData();
  
  
}

  detail(id:String){
    this.router.navigate(['detailreclamation/'+id]);
    
  }

}


