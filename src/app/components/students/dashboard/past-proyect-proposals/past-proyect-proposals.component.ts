import { Component, OnInit } from '@angular/core';
import { ProyectProposals } from 'src/app/shared/interfaces/proyect-proposals';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';


@Component({
  selector: 'app-past-proyect-proposals',
  templateUrl: './past-proyect-proposals.component.html',
  styleUrls: ['./past-proyect-proposals.component.css']
})

export class PastProyectProposalsComponent implements OnInit {
  displayedColumns = ['name', 'description', 'fair'];
  listOfProjects: Array<ProyectProposals> = []
  dataSource = new MatTableDataSource(this.listOfProjects);

  constructor(
    private customPopUpService: CustomPopUpService, 
    private projects: ProjectsService) { }

  ngOnInit(): void { 
    this.projects.getOlProjects().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        if (data == 204){
          console.log("test")
          this.openCustomPopUp('No hay datos en el sistema.');
        }
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay proyectos antiguos en el sistema');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
        } else if (err.status === 204){
          this.openCustomPopUp('No hay datos en el sistema.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
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