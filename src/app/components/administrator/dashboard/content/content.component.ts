import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  projectsByYear = []
  projectsByCategory = []
  projectsByQualifications = []
  usersPerProject = []

  constructor(
    private projectServices: ProjectsService,
    private customPopUpService: CustomPopUpService
  ) { }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Gráficos del sistema', 
      message,
      undefined
      );
  }

  ngOnInit(): void {
    this.projectServices.getProjectsByYear().subscribe(
      data => {
        this.projectsByYear = data.data
      }
      // err => {
      //   if (err.status === 404) {
      //     this.openCustomPopUp('Aún no hay datos para mostrar en los gráficos.');
      //   } else if (err.status === 403) {
      //     this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
      //   } else {
      //     this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
      //   }
      // }
    )

    this.projectServices.getProjectsByCategory().subscribe(
      data => {
        this.projectsByCategory = data.data
      }
    )

    this.projectServices.getUsersByProject().subscribe(
      data => {
        this.usersPerProject = data.data
      }
    )

    this.projectServices.getProjectsByQualifications().subscribe(
      data => {
        this.projectsByQualifications = data.data
      }
    )
  }

}
