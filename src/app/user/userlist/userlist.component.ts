import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  userList:Array<User> =[]

  constructor(
    private _dataServe:DataService
  ){}

  ngOnInit(): void {
    this._dataServe.getUsers().subscribe((res:any) =>{
      this.userList=res;
    })
  }

  deleteUser(id:string){    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => { 
      if (result.isConfirmed) {
        document.getElementById(id)?.remove();
        this._dataServe.deleteUser(id).subscribe() ;
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
        });
        
      }
     
         
    });
  }
}
