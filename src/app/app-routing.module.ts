import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import{HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {BoardModeratorComponent} from './components/board-moderator/board-moderator.component';
import {BoardUserComponent} from './components/board-user/board-user.component';
import {RegisterComponent} from './components/register/register.component';
import {UpdateUserComponent} from './user/update-user/update-user.component';
import {DashComponent} from './components/dash/dash.component';
import {WalidComponent} from './components/walid/walid.component';
import {ReclamationListComponent} from './components/reclamations/reclamation-list/reclamation-list.component'
import {ConsultUserComponent} from './user/consult-user/consult-user.component';
import {AddActualiteComponent} from './components/actualite/add-actualite/add-actualite.component';
import {UpdateActualiteComponent} from './actualite/update-actualite/update-actualite.component';
import {DetailReclamationComponent} from './components/reclamations/detail-reclamation/detail-reclamation.component';
import {ErrorComponent} from './components/error/error.component';
import {AdminGuard} from './guards/admin.guard';
import {UsersTableComponent} from '../app/user/users-table/users-table.component';
import {ReclamationComponent} from '../app/components/reclamation/reclamation.component';
import { AddDeclarationComponent } from './components/declaration/add-declaration/add-declaration.component';
import { ListDeclarationComponent } from './components/declaration/list-declaration/list-declaration.component';
const routes: Routes = [{path:'home',component:HomeComponent},
{path:'dashboard',component:DashComponent},
{path:'404',component:ErrorComponent},
{path:'addReclamation',component:ReclamationComponent},
{path:'login',component:LoginComponent },
{path:'test',component:WalidComponent},
{path:'consultuser',component:ConsultUserComponent},
{path:'consultuser/:id',component:ConsultUserComponent},
{path:'updateuser/:id',component:UpdateUserComponent},
{path:'updateuser',component:UpdateUserComponent},
{path:'detailreclamation/:id',component:DetailReclamationComponent},
{path:'detailreclamation',component:DetailReclamationComponent},
{path:'updateactualite/:id',component:UpdateActualiteComponent},
{path:'updateactualite',component:UpdateActualiteComponent},
{path:'addactualite',component:AddActualiteComponent,canActivate:[AdminGuard]},
{path:'adddeclar',component:AddDeclarationComponent},
{path:'listdeclar',component:ListDeclarationComponent},
{path:'consultreclamation',component:ReclamationListComponent},
{path:'register',component:RegisterComponent},
{path:'profile',component:ProfileComponent},
{path:'user',component:BoardUserComponent},
{path:'admin',component:BoardAdminComponent},
{path:'mod',component:BoardModeratorComponent},
{path:'users',component:UsersTableComponent},
{path:'',component:LoginComponent},
{path:'**',redirectTo:'/404'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
