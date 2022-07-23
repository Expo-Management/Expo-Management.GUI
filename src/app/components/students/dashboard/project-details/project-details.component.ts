import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';
import { ProjectQualifications } from 'src/app/shared/interfaces/project-qualifications';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project_name =''
  group_number: string | null = '1'
  project_description = ''
  group_members = [
    'Pepito Zamora', 'Pepito Zamora','Pepito Zamora'
  ]
  category = 'Computacion'
  qualification = ''

  selectedValue = '';

  judgesCalifications: JudgeCalification[] = [
    {name: 'Juan el juez', grade: ''}
  ];

  constructor(
    private route: ActivatedRoute,
    private projects: ProjectsService
  ) { }

  ngOnInit(): void {
    this.group_number = this.route.snapshot.paramMap.get('project_id');
    this.fillTheProjectInformation();
  }


  private fillTheProjectInformation() {
    this.projects.getProjectDetails(this.group_number).subscribe(
      data => {
        if (data.length > 1) {
          this.fillProjectCalification(data);
        } else {
          this.fillProjectDetails(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  private fillProjectDetails(data: ProjectQualifications[]) {
    this.project_name = data[0].projectName;
    this.project_description = data[0].projectDescription;
    this.group_members = data[0].members;
    this.category = (data[0].category != undefined || data[0].category != null) ? data[0].category : "No se le ha asignado una categoria";
    this.qualification = (data[0].finalPunctuation != undefined || data[0].finalPunctuation != null) ? data[0].finalPunctuation : "No se le ha asignado una calificacion";
  }

  private fillProjectCalification(data: ProjectQualifications[]) {
    data.forEach((calification)  => {
     this.judgesCalifications.push({name: calification.judgeName, grade: calification.punctuation}) 
    });
  }
}
