import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  baseUrl: string = `${environment.baseUrl}/users.json`;
  users: Array<User> = [];
  userExistance:BehaviorSubject<User|any>=new BehaviorSubject('');
  constructor(private _httpServe: HttpClient) {
    this.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getUsers(): Observable<User[]> {
    return this._httpServe.get<any>(this.baseUrl).pipe(
      map((res: any) => {
        let users: Array<User> = [];
        this.users = users;
        for (const key in res) {
          users.push({ ...res[key], id: key });
        }
        return users;
      })
    );
  }

  saveUser(obj:User):Observable<any>{
    return this._httpServe.post(this.baseUrl, obj)
  }
  // getCreatePost(post: User) {
  //   let exists = this.users.find(
  //     (e) =>  e.phone === post.phone
  //   );
  //   if (exists) {
  //     // Swal.fire({
  //     //   icon: 'error',
  //     //   title: 'Oops...',
  //     //   text: `The User ${post.firstName} with ${ post.phone}  already Exists !!!`,
  //     // });

  //     return;
  //   }
  //   return this._httpServe.post<User>(this.baseUrl, post);
  // }

  getSingleUser(id: string) {
    let singleUserUrl=`${environment.baseUrl}/users/${id}.json`
    // let sinlgeUser: string = `${this.baseUrl}/${id}.json`;
    // console.log(sinlgeUser);
    
    // this._httpServe.get(singleUserUrl).subscribe((res)=> {
    //   console.log(res);
      
    // })
    
    return this._httpServe.get<User>(singleUserUrl);
  }

  deleteUser(id: string) {
    let deleteUserUrl: string = `${environment.baseUrl}/users/${id}.json`;
    return this._httpServe.delete<null>(deleteUserUrl);
  }

  updateUser(obj: User) {
    let updatedUserUrl: string = `${environment.baseUrl}/users/${obj.id}.json`;
    return this._httpServe.patch<User>(updatedUserUrl, obj);
  }

  checkIfUserExists(userObj:User) : boolean{
    let validate:number=0;
    this.users.forEach(ele => {
        if(userObj.firstName === ele.firstName || userObj.userEmail === ele.userEmail || userObj.userContact === ele.userContact){         
          console.log(ele);          
          this.userExistance.next(ele);
          validate++;
        }
      })    
    if(validate > 0){
      return true
    }else{
      validate=0;
      return false;
    }
  }
}
