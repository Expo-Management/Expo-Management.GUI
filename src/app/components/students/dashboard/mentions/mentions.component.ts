import { Component, OnInit } from '@angular/core';
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
    private projects: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projects.getMentions().subscribe(
      data => {
        this.dataSource = data;
      },
      err => {}
    );
  }

}
