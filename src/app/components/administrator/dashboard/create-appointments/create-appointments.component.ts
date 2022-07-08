import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FairService } from 'src/app/shared/services/fair.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

@Component({
  selector: 'app-create-appointments',
  templateUrl: './create-appointments.component.html',
  styleUrls: ['./create-appointments.component.css']
})
export class CreateAppointmentsComponent {

  httpMessage = ''

  refresh: Subject<any> = new Subject();

  newAppoitmentForm = new FormGroup({
    start: new FormControl(
      '', {
      validators: Validators.required
    }),
    finish: new FormControl(
      '', {
      validators: Validators.required
    }),
    title: new FormControl('', {
      validators: Validators.required
    }),
    location: new FormControl('', {
      validators: Validators.required
    }),
    allDay: new FormControl(false, {
      validators: Validators.required
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: FairService,
    private customPopUpService: CustomPopUpService
  ) {
    this.newAppoitmentForm.get('allDay')?.valueChanges.subscribe(
      a => {
        if (a) {
          this.newAppoitmentForm.get('start')?.disable();
          this.newAppoitmentForm.get('end')?.disable();
        } else {
          this.newAppoitmentForm.get('start')?.enable();
          this.newAppoitmentForm.get('end')?.enable();
        }
      });
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creacion de evento', 
      message,
      'administrator/fair-calendar'
      );
  }

  parseDate(date: string) {
    let formatedDate = new Date(date);
    return formatedDate;
  }

  onSubmit() {
    this.accept()
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.createAppointment()
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  createAppointment() {
    console.log(this.newAppoitmentForm);
    this.eventService.createEvent(
      this.newAppoitmentForm.get('title')?.value,
      this.newAppoitmentForm.get('location')?.value,
      this.newAppoitmentForm.get('start')?.value,
      this.newAppoitmentForm.get('finish')?.value,
      '',
      3
    ).subscribe(
      data => {
        if (data.status == 200) {
          this.httpMessage = 'Evento creado de manera exitosa!';
        } else if (data.status == 400) {
          this.httpMessage = 'Revise los datos ingresados';
        } else {
          this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
        }

        this.openCustomPopUp(this.httpMessage);
        window.location.reload();
      },
      err => {
        if (err.status == 200) {
          this.httpMessage = 'Evento creado de manera exitosa!';
        } else if (err.status == 400) {
          this.httpMessage = 'Revise los datos ingresados';
        } else {
          this.httpMessage = 'Hubo un error en el servidor, contacte a los desarrolladores.';
        }

        this.openCustomPopUp(this.httpMessage);
      }
    );
  }

}
