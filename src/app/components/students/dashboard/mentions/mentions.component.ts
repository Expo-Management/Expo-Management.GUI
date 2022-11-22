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
        console.log(data.data);
        this.dataSource = data.data;
      },
      err => {
        if (err.status === 204) {
          this.openCustomPopUp('Aún no hay menciones.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Juez o de Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

}
