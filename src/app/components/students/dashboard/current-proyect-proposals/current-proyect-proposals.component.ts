import { Component, OnInit } from '@angular/core';
import { CurrentProyectProposals } from 'src/app/shared/interfaces/current-proyect-proposals';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Projects } from 'src/app/shared/interfaces/projects';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';


@Component({
  selector: 'app-current-proyect-proposals',
  templateUrl: './current-proyect-proposals.component.html',
  styleUrls: ['./current-proyect-proposals.component.css']
})
export class CurrentProyectProposalsComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProjects: Array<Projects> = []
  dataSource = new MatTableDataSource(this.listOfProjects);

  constructor(private customPopUpService: CustomPopUpService, private projects: ProjectsService) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'description', 'grade'];

    this.projects.ShowProjects().subscribe(
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
