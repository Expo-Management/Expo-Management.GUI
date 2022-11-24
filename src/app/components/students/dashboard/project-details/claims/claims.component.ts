import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  @Input() public project_number : string = '';
  httpMessage: string = '';

  createClaimForm = new FormGroup({
    claim: new FormControl(
      '', {
      validators: Validators.required
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    console.log(this.project_number);
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
    this.createClaim()
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creacion de evento', 
      message,
      `/student/project/${this.project_number}`);
  }

  createClaim() {
    this.projectService.createProjectClaim(
      this.project_number, 
      this.createClaimForm.get('claim')?.value).subscribe(
        data => {
          console.log(data.data)
          this.openCustomPopUp('Apelacion creada correctamente');
        }, 
        err => {
          console.log(err)
          if (err.status == 204) {
            this.openCustomPopUp('Revise los datos ingresados');
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        }
      )
  }  
}
