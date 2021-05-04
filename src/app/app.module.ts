import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {authInterceptorProviders} from './../helpers/auth_interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import { WalidComponent } from './components/walid/walid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { NavComponent } from './nav/nav.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashComponent } from './components/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {EtapeReclamationComponent} from './components/reclamations/etape-reclamation/etape-reclamation.component'
import { MatNativeDateModule } from '@angular/material/core';
import { CardComponent } from './card/card.component';
import { UsersTableComponent } from './user/users-table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddActualiteComponent } from './components/actualite/add-actualite/add-actualite.component';
import { SnackBarLoginComponent } from './helpers/snack-bar-login/snack-bar-login.component';
import { UpdateActualiteComponent } from './actualite/update-actualite/update-actualite.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ConsultUserComponent } from './user/consult-user/consult-user.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { ReclamationListComponent } from './components/reclamations/reclamation-list/reclamation-list.component';
import { DetailReclamationComponent } from './components/reclamations/detail-reclamation/detail-reclamation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    EtapeReclamationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    WalidComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    UsersTableComponent,
    AddActualiteComponent,
    SnackBarLoginComponent,
    UpdateActualiteComponent,
    UpdateUserComponent,
    ConsultUserComponent,
    ReclamationComponent,
    ReclamationListComponent,
    DetailReclamationComponent,
    LoaderComponent,
    ErrorComponent,
    
    
  ],
  imports: [
    FormsModule,
    MatNativeDateModule,
    PaginationModule.forRoot(),
    MatSelectModule,
    BrowserModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatExpansionModule,
    AppRoutingModule,
    MatChipsModule,
    MatInputModule,
    HttpClientModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot() ,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,MatSnackBarModule,
  ],
  exports:[
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
