import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/usuario.service';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './pages/gestion/gestion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ClasesComponent } from './components/clases/clases.component';
import { ClaseComponent } from './pages/clase/clase.component';
import { AlumnoService } from './services/alumno.service';
import { ClaseService } from './services/clase.service';
import { DatosComponent } from './pages/datos/datos.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { InfoComponent } from './pages/info/info.component';
import { MapComponent } from './components/map/map.component';
//import { GoogleMapsModule } from '@angular/google-maps';
//import { AgmCoreModule } from '@agm/core';
import { CreacionComponent } from './pages/creacion/creacion.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { EditarComponent } from './components/editar-alumno/editar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { EditarClaseComponent } from './components/editar-clase/editar-clase.component';
 // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,interactionPlugin
]);

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
    MapComponent,
    CreacionComponent,
    ClaseComponent,
    AlumnoComponent,
    EditarComponent,
    ModificarComponent,
    EditarUsuarioComponent,
    EditarClaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    FullCalendarModule
    //GoogleMapsModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJCazelb9sIDI9kdXZZ2NMtHIQ8hh6Zws',
      libraries: ['places'],
    }),*/
  ],
  entryComponents: [UsuariosComponent, AlumnosComponent, ClasesComponent],
  providers: [UserService,ClaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
