import { Component, OnInit } from '@angular/core';
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
    private projectServices: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectServices.getProjectsByYear().subscribe(
      data => {
        this.projectsByYear = data
      }
    )

    this.projectServices.getProjectsByCategory().subscribe(
      data => {
        this.projectsByCategory = data
      }
    )

    this.projectServices.getUsersByProject().subscribe(
      data => {
        this.usersPerProject = data
        console.log(this.usersPerProject)
      }
    )

    this.projectServices.getProjectsByQualifications().subscribe(
      data => {
        this.projectsByQualifications = data
      }
    )
  }

}
