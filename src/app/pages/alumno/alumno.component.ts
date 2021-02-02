import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EditarComponent } from 'src/app/components/editar-alumno/editar.component';
import { UserService } from 'src/app/services/usuario.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  constructor(private router: Router, private form_builder: FormBuilder, private userService: UserService, private alumnoService: AlumnoService, private activatedRoute: ActivatedRoute,) { }

  user: any;
  nivel: any;
  alumno: any;
  id: any;

  comentarioForm: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es-Es',
    eventClick(event) {
      alert("Comentario del profesor: " + event.event.title);
    },
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.alumnoService.getAlumno(this.id).subscribe((result => {
      this.alumno = result.alumno;
      this.getComentarios();
    }));

    this.userService.getLoggedUser().subscribe((result => {
      this.user = result;
      this.nivel = this.user.nivel;
    }));
    this.comentarioForm = this.form_builder.group({
      comentario: [null, [Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
    });

  }
  public enviarComentario() {
    console.log(this.comentarioForm.getRawValue());
    const formData = this.comentarioForm.getRawValue();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const data = {
      comentario: formData.comentario,
      id_alumno: this.id,
    };
    if (this.comentarioForm.valid) {

      this.alumnoService.addComentario(data).subscribe((result => {
        console.log("Comentario guardado");
        alert("Comentario guardado con éxito");
      }));
    }
  }

  public getComentarios() {
    this.alumnoService.verComentario(this.id).subscribe((result => {
      result.forEach(element => {
        //this.calendarOptions.addEvent();
        this.calendarOptions.events = [{ title: element.comentario, date: element.fecha }];
      });

    }));
  }


}
