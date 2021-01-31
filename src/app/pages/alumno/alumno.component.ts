import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EditarComponent } from 'src/app/components/editar/editar.component';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  constructor(private userService:UserService) { }

user:any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
     // bind is important!
    events: [
      { title: 'event 1', date: '2021-01-01' },
      { title: 'alsdalsdlsadlsadlsd', date: '2021-01-30' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((result=>{
      this.user=result;
    }));
  }

}
