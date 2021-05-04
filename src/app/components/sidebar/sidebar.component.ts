import { Component, OnInit ,Input} from '@angular/core';
import * as $ from 'jquery';
import {TokenStorageService} from './../../services/token-storage.service' ;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
@Input("currentuser")username:string;
  constructor(private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  }
  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
