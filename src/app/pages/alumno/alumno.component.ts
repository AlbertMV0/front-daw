import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EditarComponent } from 'src/app/components/editar/editar.component';
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

  constructor( private router: Router,private form_builder: FormBuilder, private userService: UserService, private alumnoService: AlumnoService, private activatedRoute: ActivatedRoute,) { }

  user: any;
  alumno: any;
  id:any;

  comentarioForm: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // bind is important!
    dateClick:function(info){
      alert("a");
      console.log("click");
      
    }

  };
  events: [
    { title: 'event 1', date: '2021-01-01' },
    { title: 'alsdalsdlsadlsadlsd', date: '2021-01-30' }
  ]

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.alumnoService.getAlumno(this.id).subscribe((result => {
      this.alumno = result.alumno;
      console.log(this.alumno);
      this.getComentarios();
    }));

    this.userService.getLoggedUser().subscribe((result => {
      this.user = result;
    }));
    this.comentarioForm = this.form_builder.group({
      comentario: [null, [Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
    });

  }
  public enviarComentario() {
    console.log(this.comentarioForm.getRawValue());
    const formData = this.comentarioForm.getRawValue();

    const data = {
      comentario: formData.comentario,
      id_alumno:this.alumno.id_alumno,
    };
    if (this.comentarioForm.valid) {
      console.log(data);
      
      this.alumnoService.addComentario(data).subscribe((result => {
         console.log("Comentario guardado");
        // this.router.navigate(['alumno/'+this.alumno.id_alumno]);
      }));
    }
  }

  public getComentarios(){
    this.alumnoService.verComentario(this.id).subscribe((result=>{
      console.log(result);
      result.forEach(element => {
        //this.calendarOptions.addEvent();
        this.calendarOptions.events=[{title: element.comentario, date: element.fecha}];
      });
     
    }));
  }


}
