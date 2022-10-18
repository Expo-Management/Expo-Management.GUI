import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Colours } from 'src/app/shared/interfaces/colours';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FairService } from 'src/app/shared/services/fair.service';

@Component({
  selector: 'app-add-kind-event',
  templateUrl: './add-kind-event.component.html',
  styleUrls: ['./add-kind-event.component.css']
})
export class AddKindEventComponent implements OnInit {

  httpMessage: string = '';

  KindEventForm = new FormGroup({
    nameForm: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2),
      ]
    }),
    primaryForm: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    secondaryForm: new FormControl('', {
      validators: [
        Validators.required,
      ]
    })
  });

  colours!: Colours[];

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private FairService: FairService
  ) { }

  ngOnInit(): void {
    this.FairService.getColours().subscribe(
      data => {
        console.log(data.data);
        this.colours = data.data;
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
    this.createKindEvent()
    this.activeModal.close(true);
    window.location.reload();
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de tipos de eventos', 
      message,
      'administrator/fair-categories');
  }

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.KindEventForm.controls[controlName].hasError(errorName);
  }

  createKindEvent() {
    this.FairService.createKindEvent(
      this.KindEventForm.get('nameForm')?.value,
      this.KindEventForm.get('primaryForm')?.value,
      this.KindEventForm.get('secondaryForm')?.value
      ).subscribe(
        data => {
          console.log(data)
          if (data.status == 500) {
            this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
          } else if (data.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else if (data.status == 200){
            this.openCustomPopUp('Tipo de evento creado exitosamente!');
          }
            this.openCustomPopUp(this.httpMessage);
        }, 
        err => {
          console.log(err)
          if (err.status == 400) {
            this.httpMessage = 'Revise los datos ingresados';
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
          } else if (err.status == 200){
            this.openCustomPopUp('Tipo de evento creado exitosamente!');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
          this.openCustomPopUp(this.httpMessage);
        }
      )
  }  
}
