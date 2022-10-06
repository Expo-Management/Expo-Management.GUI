import { Component, OnInit } from '@angular/core';
import { ContactStudentsPopupComponent } from '../contact-students-popup/contact-students-popup.component';
import { RecomendationsPopupComponent } from '../recomendations-popup/recomendations-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectQualifications } from 'src/app/shared/interfaces/project-qualifications';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';



@Component({
  selector: 'app-project-to-qualify-details',
  templateUrl: './project-to-qualify-details.component.html',
  styleUrls: ['./project-to-qualify-details.component.css']
})

export class ProjectToQualifyDetailsComponent implements OnInit {
  project_name ='';
  group_number: string | null = '1';
  project_description = '';
  group_members: string[] = [];
  category = '';
  canJudgeQualifyTheProject = true;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public modalService: NgbModal,
    private customPopUpService: CustomPopUpService,
    private personalInformation: PersonalInformationService
    ) { }

    ngOnInit(): void {
      this.group_number = this.route.snapshot.paramMap.get('project_id')!;

      this.projects.canJudgeQualifyTheProject(+this.group_number, this.personalInformation.getEmail()).subscribe(
        data => {
          if (data.status_code === 200 || data) 
          {
            this.canJudgeQualifyTheProject = false;
          } else if (data.status === 400 && data.statusText === 'Bad Request'){
            this.openCustomPopUp('Usted ya ha calificado el actual proyecto');
            this.canJudgeQualifyTheProject = true;
          }
        },
        err => {
          if (err.status === 400 && err.statusText === 'Bad Request') 
          {
            this.canJudgeQualifyTheProject = true;
          } else if (err.status === 200 || err) 
          {
            this.canJudgeQualifyTheProject = false;
          }
        }
      );

      this.fillTheProjectInformation();
    }
  
    downloadFile(): void {
      this.projects.getProjectFile(this.group_number).subscribe(
        response => {
          console.log(response);
          let fileName = response.headers.get('content-disposition')
          ?.split(';')[1].split('=')[1].split('"')[1];
          let blob:Blob = response.body as Blob;
          let a = document.createElement('a');
          a.download = fileName!;
          a.href = window.URL.createObjectURL(blob);
          a.click();
        },
        err => {
          console.log("download error: " + err);
          if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Juez para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        }
      );
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
      this.category = (data[0].category != undefined || data[0].category != null) ? data[0].category : "No se le ha asignado una categoria";
    }

  openRecomendation() {
    const modalRef = this.modalService.open(RecomendationsPopupComponent, {centered: true});
    modalRef.componentInstance.project_number = this.group_number;
  }

  openEmails() {
    const modalRef = this.modalService.open(ContactStudentsPopupComponent, {centered: true});
    modalRef.componentInstance.group_number = this.group_number;
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Detalles de proyecto', 
      message,
      `judges/project-details/${this.group_number}`
      );
  }
}
