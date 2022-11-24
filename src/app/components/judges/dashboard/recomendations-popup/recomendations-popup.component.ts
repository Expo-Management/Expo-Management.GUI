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
    recommendation: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(400)
      ]
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private projectService: ProjectsService,
    private personalInfo: PersonalInformationService
  ) { }

  ngOnInit(): void {
    console.log('group number: '+ this.project_number);
    console.log('judge email: '+ this.personalInfo.getEmail())
    console.log(localStorage);
  }

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.createRecommendationForm.controls[controlName].hasError(errorName);
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
      'Recomendación', 
      message,
      `/judges/project-details/${this.project_number}`);
  }

  createRecommendation() {
    this.projectService.createProjectRecommendation(
      this.project_number, 
      this.createRecommendationForm.controls['recommendation'].value,
      this.personalInfo.getEmail()).subscribe(
        data => {
          console.log(data.data)
          // if (data.status == 500) {
          //   this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
          // } else if (data.status == 400) {
          //   this.httpMessage = 'Revise los datos ingresados';
          // } else {
          //   this.httpMessage = 'Recommendacion creada correctamente';
          // }
          this.openCustomPopUp('Recommendación creada correctamente');
        }, 
        err => {
          console.log(err)
          if (err.status == 400) {
            this.openCustomPopUp('Revise los datos ingresados');
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Juez para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        }
      )
  }
}
