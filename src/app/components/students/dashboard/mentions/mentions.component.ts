import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  dataSource: any[] = [];

  constructor(
    private projects: ProjectsService,
    private customPopUpService: CustomPopUpService,
  ) { }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Lista de menciones', 
      message,
      undefined
      );
  }

  ngOnInit(): void {
    this.projects.getMentions().subscribe(
      data => {
        this.dataSource = data;
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay menciones registradas aun.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesion con una cuenta con rol de Juez o Estudiantes para acceder a esta seccion.');
        } else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

}
