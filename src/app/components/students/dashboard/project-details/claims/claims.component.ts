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
          console.log(data)
          if (data.status == 500) {
            this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
          } else if (data.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else {
            this.httpMessage = 'Apelacion creada correctamente';
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
