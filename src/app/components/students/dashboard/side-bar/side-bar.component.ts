import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/shared/services/students.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  user_email: string = '';

  user_options = [
    {
      link: 'new-project',
      icon: 'add',
      text: 'Crear Proyecto'
    },
    {
      link: 'project',
      icon: 'info',
      text: 'Detalles del proyecto'
    },
  ]

  fair_options = [
    {
      link: 'current-projects',
      icon: 'list',
      text: 'Lista de proyectos actuales'
    },
    /*{
      link: 'project-mentions',
      icon: 'stars',
      text: 'Menciones de proyecto'
    },*/
    {
      link: 'past-projects',
      icon: 'arrow_back',
      text: 'Proyectos anteriores'
    },
    { 
      icon: 'calendar_today',
      text: 'Calendario de la feria',
      link: 'fair-calendar',
    },
  ]

  fair_documents = [
    {
      link: 'fair-documents',
      icon: 'folder',
      text: 'Documentación necesaria'
    },
    {
      link: 'security-protocols',
      icon: 'security',
      text: 'Protocolos de seguridad de la feria'
    },
  ]

  constructor(
    private studentsServices: StudentsService,
    private PersonalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.user_email = this.PersonalInformationService.getEmail()!;
    this.studentsServices.getStudent(this.user_email).subscribe(
      data => {
        console.log(data.data)
        if(data.data.project != null){
          this.user_options.shift()
          this.user_options[0].link = "project/"+data.project.id
        }else{
          this.user_options.pop()
        }
      }
    )
  };
}
