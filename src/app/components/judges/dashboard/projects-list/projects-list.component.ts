import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { MatTableDataSource } from '@angular/material/table';
import { Projects } from 'src/app/shared/interfaces/projects';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'
]
})

export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProjects: Array<Projects> = []
  dataSource = new MatTableDataSource(this.listOfProjects);

  constructor(
    private customPopUpService: CustomPopUpService, 
    private projectservices: ProjectsService
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'description', 'id'];

    this.projectservices.ShowProjects().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay proyectos en el sistema');
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
      'Proyectos', 
      message,
      undefined
      );
  }

}
