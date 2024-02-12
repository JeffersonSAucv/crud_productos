import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PrivateGuard } from '../private.guard';
import { TokenInterceptorService } from '../service/token-interceptor.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, // ordeamiento
    MatFormFieldModule,  //filtro rapido
    MatInputModule, //inputs
    MatIconModule, //iconos
    MatTooltipModule, //tooltip
    MatButtonModule,//botones
    MatDialogModule, //modal emergente
    MatSlideToggleModule,  //slide toggle switch
    MatSelectModule, //selects
    ReactiveFormsModule, //formulario reactivo
    HttpClientModule, //http
    MatProgressBarModule, //progress bar
    MatSnackBarModule, //snack bar
    MatProgressSpinnerModule, //spinner circular
    MatSidenavModule, //sideBar
    MatListModule , // lista

  ],
  exports: [

      CommonModule,
      MatToolbarModule,
      MatCardModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule, // ordeamiento
      MatFormFieldModule,  //filtro rapido
      MatInputModule, //inputs
      MatIconModule, //iconos
      MatTooltipModule, //tooltip
      MatButtonModule,//botones
      MatDialogModule, //modal emergente
      MatSlideToggleModule,  //slide toggle switch
      MatSelectModule, //selects
      ReactiveFormsModule, //formulario reactivo
      HttpClientModule, //http
      MatProgressBarModule, //progress bar
      MatSnackBarModule, //snack bar
      MatProgressSpinnerModule, //spinner circular
      MatSidenavModule, //sideBar
      MatListModule, // lista


  ],
  providers: [
    PrivateGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ]
})
export class SharedModule { }
