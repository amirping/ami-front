import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../models/ticket';
import { Reclamation } from '../models/reclamation';
import { Etape } from '../models/etape';

const API_URL='http://localhost:8080/api/test/';
const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get(API_URL+'categories');
  }
  updateEtape(id:String,etape:Etape):Observable<any>{
    return this.http.put(API_URL+'updateEtape/'+id,etape);
  }
  addReclamation(ticket:Ticket):Observable<any>{
    return this.http.post(API_URL+'addTicketReclamation',ticket
    ,httpOptions);
  }

  updateReclamation(id:string,reclamation:Reclamation):Observable<any>{
    return this.http.put(API_URL+'updateReclamation/'+id,reclamation);
  }

  getAll():Observable<any>{
    return this.http.get(API_URL+'Tickets');
  }
  getReclamation(id:String):Observable<any>{
    return this.http.get(API_URL+'findReclamation/'+id);
  }
  getA9bahFunction():Observable<any>{
    return this.http.get(API_URL+'test3');
  }
  getReclamationById(id:string):Observable<any>{
    return this.http.get(API_URL+'getReclamationById/'+id);
  }
  getEtapeById(id:String):Observable<any>{
    return this.http.get(API_URL+'findEtape/'+id);
  }
  code():Observable<any>{
    return this.http.get(API_URL+'testcode');
  }
}
