import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  socket:SocketIOClient.Socket;


  constructor() {
   }

   listen(eventname:string):Observable<any>{
    return new Observable((subscribe)=>{
      this.socket.on(eventname,(data)=>{
        subscribe.next(data);
      })
    })
   }


   emit(eventname:string,data:any){
      this.socket.emit(eventname,data);
   }
}
