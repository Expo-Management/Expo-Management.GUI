import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProtocolsService } from 'src/app/shared/services/protocols.service';

@Component({
  selector: 'app-add-protocol',
  templateUrl: './add-protocol.component.html',
  styleUrls: ['./add-protocol.component.css']
})
export class AddProtocolComponent implements OnInit {
  httpMessage: string = '';

  categoryForm = new FormGroup({
    descriptionForm: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(250)
      ]
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private ProtocolsService: ProtocolsService
  ) { }

  ngOnInit(): void {
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
    this.createCategory()
    this.activeModal.close(true);
    window.location.reload();
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de protocolos de seguridad', 
      message,
      'administrator/fair-protocols');
  }

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  createCategory() {
    this.ProtocolsService.addProtocols(
      this.categoryForm.get('descriptionForm')?.value).subscribe(
        data => {
          console.log(data)
          if (data.status == 200) {
            this.httpMessage = data.message;
          } else if (data.status == 400) {
            this.httpMessage = data.message;
          } else {
            this.httpMessage = data.message;
          }
          this.openCustomPopUp(this.httpMessage);
        }, 
        err => {
          console.log(err)
          if (err.status == 400) {
            this.openCustomPopUp(err.message);
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
          } else {
            this.openCustomPopUp(err.message);
          }
        }
      )
  }  
}
