import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';

import { HttpClientModule } from "@angular/common/http";
import { UserService } from './services/usuario.service';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './pages/gestion/gestion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ClasesComponent } from './components/clases/clases.component';
import { DatosComponent } from './pages/datos/datos.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { InfoComponent } from './pages/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CarouselComponent,
    JumbotronComponent,
    LoginComponent,
    GestionComponent,
    UsuariosComponent,
    AlumnosComponent,
    ClasesComponent,
    DatosComponent,
    FooterComponent,
    DatosPersonalesComponent,
    RegistrarComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],entryComponents:[UsuariosComponent,AlumnosComponent,ClasesComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
