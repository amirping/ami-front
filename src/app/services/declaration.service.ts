import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Actualite } from '../models/actualite';
import {io} from 'socket.io-client/build/index';
import { Declaration } from '../models/declarations';

const API_URL='http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  
  constructor(private http:HttpClient) { }

  

  getDeclarationList():Observable<any>{
    return this.http.get(API_URL+'listDeclaration');
  }
  addDeclaration(declaration:Declaration):Observable<any>{
    return this.http.post(API_URL+'addDeclaration',declaration
    ,httpOptions);
  }

  getDeclarationById(id:string):Observable<any>{
    return this.http.get(API_URL+'getDeclarationById/'+id);
  }

  deleteDeclaration(id:string):Observable<any>{
    return this.http.delete(API_URL+'deleteDeclaration/'+id);
  }

  updateDeclaration(id:string,declaration:Declaration):Observable<any>{
    return this.http.put(API_URL+'updateDeclaration/'+id,declaration);
  }

}
