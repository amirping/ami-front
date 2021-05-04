import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Actualite } from '../models/actualite';
import {io} from 'socket.io-client/build/index';

const API_URL='http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  
  constructor(private http:HttpClient) { }

  

  getActualiteList():Observable<any>{
    return this.http.get(API_URL+'listActuality');
  }
  addActualite(actualite:Actualite):Observable<any>{
    return this.http.post(API_URL+'addActuality',actualite
    ,httpOptions);
  }

  getActualiteById(id:string):Observable<any>{
    return this.http.get(API_URL+'getActualityById/'+id);
  }

  deleteActualite(id:string):Observable<any>{
    return this.http.delete(API_URL+'deleteActuality/'+id);
  }

  updateActualite(id:string,actualite:Actualite):Observable<any>{
    return this.http.put(API_URL+'updateActuality/'+id,actualite);
  }

}
