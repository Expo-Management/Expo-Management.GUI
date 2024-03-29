import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/interfaces/user';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { StudentsService } from 'src/app/shared/services/students.service';


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})


export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfStudents: Array<User> = []
  dataSource = new MatTableDataSource(this.listOfStudents);

  constructor(
    private customPopUpService: CustomPopUpService, private studentsServices: StudentsService) {}

  ngOnInit(): void {
    this.displayedColumns = [/*'userId', */'name', 'lastname', 'email', 'phoneNumber', 'actions'];

    this.studentsServices.getStudents().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.data);
      } ,
      err => {
        if (err.status === 204) {
          this.openCustomPopUp(err.message);
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        }else{
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
      }
      }
    );
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
            }else{
              this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
          }
        );
      });
  }

  private studentDeleted() {
    this.openCustomPopUp('¡Estudiante eliminado!');
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
