import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-recomendations-popup',
  templateUrl: './recomendations-popup.component.html',
  styleUrls: ['./recomendations-popup.component.css']
})
export class RecomendationsPopupComponent implements OnInit {

  @Input() public project_number : number = 0;

  httpMessage: string = '';

  createRecommendationForm = new FormGroup({
    recommendation: new FormControl(
      '', {
      validators: Validators.required
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private projectService: ProjectsService,
    private personalInfo: PersonalInformationService
  ) { }

  ngOnInit(): void {
    console.log(localStorage);
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
    this.createRecommendation()
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creacion de recomendacion', 
      message,
      `/judges/project-details/${this.project_number}`);
  }

  createRecommendation() {
    console.log(this.project_number);
    this.projectService.createProjectRecommendation(
      this.project_number, 
      this.createRecommendationForm.get('recomendation')?.value,
      this.personalInfo.getEmail()).subscribe(
        data => {
          console.log(data)
          if (data.status == 500) {
            this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
          } else if (data.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else {
            this.httpMessage = 'Recommendacion creada correctamente';
          }
          this.openCustomPopUp(this.httpMessage);
        }, 
        err => {
          console.log(err)
          if (err.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else {
            this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
          }
          this.openCustomPopUp(this.httpMessage);
        }
      )
  }

}
