import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { RegularExpressions } from 'src/app/shared/validators/validation-expressions.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent {
  userInfoForm!: FormGroup;
  userId!: string;
  constructor(
    private _dataServe: DataService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.userId = this._activeRoute.snapshot.params['id'];

    if (this.userId) {
      this._dataServe.getSingleUser(this.userId).subscribe((res: User) => {
        this.userInfoForm.patchValue(res);
      })
    }
  }

  createForm() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      userAddress: new FormControl(null, [
        Validators.required,
        Validators.maxLength(70),
      ]),
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegularExpressions.emailValidation),
      ]),
      userContact: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(RegularExpressions.contactValidationNum),
      ]),
    });
  }

  formSubmit() {
    let userObj: User = {
      ...this.userInfoForm.value
    }

    if (!this._dataServe.checkIfUserExists(userObj)) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `New User ${userObj.firstName} is Added !!!`,
        showConfirmButton: false,
        timer: 1000,
      });
      this._dataServe.saveUser(userObj).subscribe((res: any) => {
        this._router.navigate(['/users']);
      })
    } else {

      Swal.fire({
        title: 'Update?',
        text: "This user already exists...Do you want to update the same?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Updation confirmed!',
            text: 'User info ready for updation',
            icon: 'success',
          });
          this._dataServe.userExistance.subscribe((ele: any) => {
            this._router.navigate(['/', 'users', ele.id + '', 'edit']);
          })
        } else {
          this.userInfoForm.reset();
        }
      });
    }
  }

  updateUser() {
    let userObj: User = {
      ...this.userInfoForm.value,
      id: this.userId
    }

    this._dataServe.updateUser(userObj).subscribe((res: any) => {
      this._router.navigate(['/users']);
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `User ${userObj.firstName} is Updated Successfully !!!`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
}
