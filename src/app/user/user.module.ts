import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

const componentRoutes: Routes = [
  { path:'', component:HomeComponent },
  { path:'users', component:UserlistComponent },
  { path:'users/add', component:UserUpsertComponent },
  { path:'users/:id/edit', component:UserUpsertComponent }
];

@NgModule({
  declarations: [
    UserUpsertComponent,
    UserlistComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(componentRoutes)
  ]
})
export class UserModule { 
  constructor(){ }
}
