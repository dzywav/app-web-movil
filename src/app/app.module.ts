import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
//Para usar el mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

//Componentes de la app - screens
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { LeftSidebarComponent } from './partials/left-sidebar/left-sidebar.component';
import { HeaderAppComponent } from './partials/header-app/header-app.component';
import { FooterAppComponent } from './partials/footer-app/footer-app.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { BasesPromocionScreenComponent } from './screens/bases-promocion-screen/bases-promocion-screen.component';
import { PoliticaPrivacidadScreenComponent } from './screens/politica-privacidad-screen/politica-privacidad-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    LeftSidebarComponent,
    HeaderAppComponent,
    FooterAppComponent,
    HomeScreenComponent,
    BasesPromocionScreenComponent,
    PoliticaPrivacidadScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMaskDirective,
    MatSidenavModule
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
