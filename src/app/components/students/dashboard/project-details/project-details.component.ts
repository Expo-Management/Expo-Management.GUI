import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';
import { ProjectQualifications } from 'src/app/shared/interfaces/project-qualifications';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { ClaimsComponent } from './claims/claims.component';
import { QualificationComponent } from './qualification/qualification.component';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})

export class ProjectDetailsComponent implements OnInit {
  project_name = ''
  group_number: string | null = '0'
  project_description = ''
  group_members: string[] = []
  category = ''
  qualification = ''

  selectedJudge = '';
  selectedQualification = '';

  judgesCalifications: JudgeCalification[] = [];

  user_email: string = '';

  constructor(
    private PersonalInformationService: PersonalInformationService,
    private customPopUpService: CustomPopUpService,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.group_number = this.route.snapshot.paramMap.get('project_id');
    console.log('project id: ' + this.group_number)
    this.fillTheProjectInformation();
  }


  private fillTheProjectInformation() {
    this.projects.getProjectDetails(this.group_number).subscribe(
      data => {
        console.log(data.data);

        this.fillProjectCalification(data.data[0].projectQualifications);
        this.fillProjectDetails(data.data);
      },
      err => {
        console.log(err);
        if (err.status === 204) {
          this.openCustomPopUp("Proyecto no encontrado");
        } else {
          this.openCustomPopUp('Hubo un problema procesando su solicitud, contacte administración.');
        }
      }
    );

    this.user_email = this.PersonalInformationService.getEmail()!;
  }

  private fillProjectDetails(data: ProjectQualifications[]) {
    this.project_name = data[0].projectName;
    this.project_description = data[0].projectDescription;
    this.group_members = data[0].members;

    this.category = (data[0].category != undefined || data[0].category != null) ? data[0].category : "No se le ha asignado una categoria";
    this.qualification = ((data[0].finalPunctuation != undefined || data[0].finalPunctuation != null) && data[0].projectQualifications.length > 0) ? data[0].finalPunctuation : "No se le ha asignado una calificacion";
  }

  private fillProjectCalification(data: JudgeCalification[]) {
    data.forEach((ProjectQualification) => {
      this.judgesCalifications.push({ judgeName: ProjectQualification.judgeName, punctuation: ProjectQualification.punctuation })
      console.log(this.judgesCalifications)
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
    const modalRef = this.modalService.open(ClaimsComponent, { centered: true });
    modalRef.componentInstance.project_number = this.group_number;
  }

  checkRecommendations() {
    const modalRef = this.modalService.open(RecommendationsComponent, { centered: true });
    modalRef.componentInstance.project_number = this.group_number;
  }

  viewQualification() {
    const modalRef = this.modalService.open(QualificationComponent, { centered: true });
    modalRef.componentInstance.judgesCalifications = this.judgesCalifications;
  }

  dialogDelete(): void {
    console.log(this.user_email)
    this.openCustomPopUp("¿Estás seguro que quieres renunciar de la feria?").then(
      (result: boolean) => {
        this.projects.RemoveStudentFromProject(this.user_email).subscribe(
          data => {
            console.log(data.data)
            this.userDeleted();
          },
          err => {
            console.log(err)
            if (err.status === 200) {
              this.userDeleted();
            } else if (err.status === 204) {
              this.openCustomPopUp("estudiante no encontrado");
            } else {
              this.openCustomPopUp('Hubo un problema procesando su solicitud, contacte administración.');
            }
          }
        );
      });
  }

  private userDeleted() {
    this.openCustomPopUp('!Has sido removido del proyecto exitosamente!');
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Detalles de proyecto',
      message,
      'student/project-details'
    );
  }
}
