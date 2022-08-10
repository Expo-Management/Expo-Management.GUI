import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';
import { Recommendation } from 'src/app/shared/interfaces/recommendation';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  displayedColumns: string[] = ['judgeName', 'recommendation'];
  dataSource: Recommendation[] = [];
  sub_total = 10

  @Input() public  project_number: number = 0;

  constructor(
    public activeModal: NgbActiveModal, 
    private customPopUpService: CustomPopUpService, 
    private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectService.getProjectRecommendations(this.project_number).subscribe(
      data => {
        this.dataSource = data;
      },
      err => {
        if (err.status === 500){
          this.openCustomPopUp('Hubo un problema contactando los servidores, contacte a administracion.');
        } else {
          this.openCustomPopUp('No hay recommendaciones para este proyecto');
        }
      }
    )
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public decline() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.accept()
  }

  public accept() {
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Detalles de las recomendaciones', 
      message,
      `/student/project/${this.project_number}`);
  }
}
