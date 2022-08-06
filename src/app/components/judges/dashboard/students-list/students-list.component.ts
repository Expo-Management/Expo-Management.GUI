import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectMembers } from 'src/app/shared/interfaces/project-members';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})


export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfStudents: Array<ProjectMembers> = [];
  dataSource = new MatTableDataSource(this.listOfStudents);

  constructor(private customPopUpService: CustomPopUpService, private projectsServices: ProjectsService) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastName', 'phoneNumber', 'projectName'];

    this.projectsServices.GetMembers().subscribe(
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
