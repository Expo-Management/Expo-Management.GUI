import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FairService } from 'src/app/shared/services/fair.service';

@Component({
  selector: 'app-fair-news',
  templateUrl: './fair-news.component.html',
  styleUrls: ['./fair-news.component.css']
})
export class FairNewsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'date', 'publisher'];
  dataSource: any[] = [];

  constructor(
    private projects: FairService,
    private customPopUpService: CustomPopUpService
  ) { }

  ngOnInit(): void {
    this.projects.getNews(2).subscribe(
      data => {
        console.log(data)
        this.dataSource = data;
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('Aún no hay noticias sobre la feria.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador o Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de proyectos', 
      message,
      'student/fair-news'
      );
  }

}
