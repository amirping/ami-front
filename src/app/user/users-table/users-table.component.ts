import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { UsersTableDataSource, UsersTableItem } from './users-table-datasource';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as $ from 'jquery';
import { map } from 'rxjs/operators';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UsersTableItem>;
  dataSource: UsersTableDataSource;


  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          
          chart: { cols: 1, rows: 4 },
          
        };
      }
 
     return {
        columns: 1,
        
        chart: { cols: 2, rows: 4 },
        
      };
    })
  );
  constructor(private snackbar:MatSnackBar,private modalService:BsModalService,private router:Router,private tokenStorageService:TokenStorageService,private userService:UserService,private breakpointObserver:BreakpointObserver){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  list:any;
  user:any;
  modalRef:BsModalRef;
  i=0;
  contentArray=new Array(90).fill('');
  returnedArray:string[];
  verif:boolean=false;
  currentUser:any;
  bool:boolean=false;
  ngOnInit() {

    this.currentUser=this.tokenStorageService.getUser();
    this.contentArray=this.contentArray.map((v:string,i:number)=>`Content line ${i+1}`);
    this.returnedArray=this.contentArray.slice(0,3);
    this.dataSource = new UsersTableDataSource();
    this.userService.getUsersList().subscribe(
      data=>{
        this.list=data;
        console.log(this.list);
        while(this.i<this.list.length){
          
          console.log(this.list[this.i].status);
          if(this.list[this.i].status=='Pending'){
            this.verif=false;
            console.log("pending")
            return this.verif;
          }else this.verif=true;return this.verif;console.log("active")
          this.ngOnInit();
          this.i++;
        }

      }
    );
    
     }

     pageChangedEvent(event:PageChangedEvent):void{
       const startItem=(event.page-1)*event.itemsPerPage;
       const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
     }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  
  // checkVerif(){
  //   for(let i=0;i<this.list.length;i++){
  //     console.log(this.list[i].status);
  //   }
  
    
  // }

  deleteUser(id:string,user:User){
    this.userService.getUserById(id).subscribe(
      data=>{
        user=data;
        console.log(id);
        this.ngOnInit();
        this.modalRef.hide();
      }
    )
    this.userService.deleteUser(id).subscribe(
      data=>{
        this.list=this.list.filter(u=>u!==this.user);
        console.log(data)
        this.openSnackBar("User deleted successfully !","ok")
      },
      
      error=>{console.log(error)
        this.openSnackBar("Error while deleting user !","ok")}
      
    )
  }
  consult(id:string,user:User){
    this.router.navigate(['consultuser/'+id]);
    
  }
  test(id:string){
    if(id==this.currentUser.id){
      this.bool=true;
      
      return this.bool;
    }
    else this.bool=false;
    
    return this.bool;
  }

  openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);

  }
  closeModal(template:TemplateRef<any>){
    this.modalRef.hide();
  
  }
  openSnackBar(message:string,action:string){
    this.snackbar.open(message,action,{
      duration:2000
    })
  }
}
