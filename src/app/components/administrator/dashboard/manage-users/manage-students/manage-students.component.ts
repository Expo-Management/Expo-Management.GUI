import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { StudentsService } from 'src/app/shared/services/students.service';

export interface Students {
  name: string;
  last: string;
  email: string;
  phone: string;
  project: string;
}

/*const ELEMENT_DATA: Students[] = [
  { name: 'Andrés', last: 'Sanchez', email: 'andres.sanchez@gmail.com', phone: '888-888-888', project: 'YakoStore'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888', project: 'TrackerBar'},
 
];*/


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})


export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource : any[] = [];

  constructor(
    private customPopUpService: CustomPopUpService,
    private studentsServices: StudentsService) {}

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastname', 'email', 'phoneNumber', 'proyecto', 'actions'];

    this.studentsServices.getStudents().subscribe(
      data => {
        this.dataSource = data;
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay estudiantes registrados.');
        } else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  dialogDelete(email: string): void{ 
    this.openCustomPopUp("¿Estás seguro de borrar el usuario?").then(
      (result: boolean) => {
        this.studentsServices.deleteStudent(email).subscribe(
          data => {
            this.studentDeleted();
          },
          err => {
            if (err.status === 200) {
              this.studentDeleted();
            } else {
              this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      });
  }

  private studentDeleted() {
    this.openCustomPopUp('Estudiante eliminado!');
    window.location.reload();
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Estudiantes', 
      message,
      undefined
      );
  }

}
