import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';

const API_URL='http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }


  getUsersList():Observable<any>{
    return this.http.get(API_URL+'list');
  }
  getUserById(id:string):Observable<any>{
    return this.http.get(API_URL+'findUserById/'+id);
  }
  getPublicContent():Observable<any>{
    return this.http.get(API_URL+'all',{responseType:'text'});
  }

  getUserBoard():Observable<any>{
    return this.http.get(API_URL+'mod',{responseType:'text'});

  }

  getAdminBoard():Observable<any>{
    return this.http.get(API_URL+'admin',{responseType:'text'});
  }

  getActualiteList():Observable<any>{
    return this.http.get(API_URL+'listActuality');
  }
  updateUser(id:string,user:User):Observable<any>{
    return this.http.put(API_URL+'updateUser/'+id,user);
  }
  deleteUser(id:string):Observable<any>{
    return this.http.delete(API_URL+'deleteUser/'+id);
  }
}
