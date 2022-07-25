import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';
import { ProjectQualifications } from 'src/app/shared/interfaces/project-qualifications';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ClaimsComponent } from './claims/claims.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project_name =''
  group_number: string | null = '1'
  project_description = ''
  group_members: string[] = []
  category = ''
  qualification = ''

  selectedJudge = '';
  selectedQualification = '';

  judgesCalifications: JudgeCalification[] = [];

  constructor(
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.group_number = this.route.snapshot.paramMap.get('project_id');
    this.fillTheProjectInformation();
  }


  private fillTheProjectInformation() {
    this.projects.getProjectDetails(this.group_number).subscribe(
      data => {
        console.log(data);
        
          this.fillProjectCalification(data[0].projectQualifications);
          this.fillProjectDetails(data);
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
    this.qualification = ((data[0].finalPunctuation != undefined || data[0].finalPunctuation != null) && data[0].projectQualifications.length > 0)  ? data[0].finalPunctuation : "No se le ha asignado una calificacion";
  }

  private fillProjectCalification(data: JudgeCalification[]) {
    data.forEach((ProjectQualification)  => {
     this.judgesCalifications.push({judgeName: ProjectQualification.judgeName, punctuation: ProjectQualification.punctuation}) 
    });
  }

  getJudgeQualification(judgeName: string) {
    this.judgesCalifications.forEach((judgeQualification) => {
      if (judgeQualification.judgeName == judgeName) {
        this.selectedQualification = judgeQualification.punctuation
      }
    })
  }

  createClaim() {
    const modalRef = this.modalService.open(ClaimsComponent, {centered: true});
    modalRef.componentInstance.project_number = this.group_number;
  }
}
