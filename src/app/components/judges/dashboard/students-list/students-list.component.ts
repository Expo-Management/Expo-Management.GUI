import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { User } from 'src/app/shared/interfaces/user';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})


export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfStudents: Array<User> = [];
  dataSource = new MatTableDataSource(this.listOfStudents);

  constructor(private customPopUpService: CustomPopUpService, private studentsServices: StudentsService) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastname', 'email', 'phoneNumber'];

    this.studentsServices.getStudents().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Estudiantes', 
      message,
      undefined
      );
  }

}
