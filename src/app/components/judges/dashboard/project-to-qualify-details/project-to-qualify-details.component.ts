import { Component, OnInit } from '@angular/core';
import { ContactStudentsPopupComponent } from '../contact-students-popup/contact-students-popup.component';
import { RecomendationsPopupComponent } from '../recomendations-popup/recomendations-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectQualifications } from 'src/app/shared/interfaces/project-qualifications';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-to-qualify-details',
  templateUrl: './project-to-qualify-details.component.html',
  styleUrls: ['./project-to-qualify-details.component.css']
})

export class ProjectToQualifyDetailsComponent implements OnInit {
  project_name =''
  group_number: string | null = '1'
  project_description = ''
  group_members: string[] = []
  category = ''

  constructor(
    private dialog: MatDialog,
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
     // this.group_number = data[0].projectId;
      this.category = (data[0].category != undefined || data[0].category != null) ? data[0].category : "No se le ha asignado una categoria";
    }


  openRecomendation() {
    const dialogRef = this.dialog.open(RecomendationsPopupComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  openEmails() {
    const dialogRef = this.dialog.open(ContactStudentsPopupComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
