import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-qualify',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.css']
})
export class QualifyComponent implements OnInit {

  @Input() public project_number : number = 0;

  httpMessage: string = '';

  qualifyProjectForm = new FormGroup({
    qualificationFromControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern("^[1-9][0-9]?$|^100$"),
        Validators.maxLength(3),
        Validators.minLength(1)
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
    this.createQualification()
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Calificación', 
      message,
      `/judges/project-details/${this.project_number}`);
  }

  createQualification() {
    this.projectService.qualify(
      this.qualifyProjectForm.controls['qualificationFromControl'].value,
      this.project_number,
      this.personalInfo.getEmail(),
      ).subscribe(
        data => {
          console.log(data)
          if (data.status == 500) {
            this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
            console.log('test')
          } else if (data.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else {
            this.httpMessage = 'Calificación subida correctamente';
          }
          this.openCustomPopUp(this.httpMessage);
        }, 
        err => {
          console.log(err)
          if (err.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Juez para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
          this.openCustomPopUp(this.httpMessage);
        }
      )
  }

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.qualifyProjectForm.controls[controlName].hasError(errorName);
  }

}
