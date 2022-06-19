import { Component, OnInit } from '@angular/core';
import { CurrentProyectProposals } from 'src/app/shared/interfaces/current-proyect-proposals';
import { ProjectsService } from 'src/app/shared/services/projects.service';


@Component({
  selector: 'app-current-proyect-proposals',
  templateUrl: './current-proyect-proposals.component.html',
  styleUrls: ['./current-proyect-proposals.component.css']
})
export class CurrentProyectProposalsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'grade'];
  dataSource: any[] = [];

  constructor(
    private projects: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projects.getCurrentProjects().subscribe(
      data => {
        this.dataSource = data;
      },
      err => {}
    );
  }

}
