import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FairService } from 'src/app/shared/services/fair.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { KindEvents } from 'src/app/shared/interfaces/kind-events';

export interface Response {
  status: number,
  message: string,
  error: string[],
  data: object
}


@Component({
  selector: 'app-create-appointments',
  templateUrl: './create-appointments.component.html',
  styleUrls: ['./create-appointments.component.css']
})
export class CreateAppointmentsComponent implements OnInit{
  kindOfEvents: KindEvents[] = [
//     {id: 1, name: 'Importante', primary: '#AD2121', secondary: '#FAE3E3'}
// ,{id: 2, name: 'Informacion', primary: '#1E90FF', secondary: '#D1E8FF'} 
// ,{id: 3, name: 'Noticia', primary: '#E3BC08', secondary: '#FDF1BA'}
  ];
  httpMessage = '';
  allDayChose: boolean = false;
  selectedKindOfEvent: KindEvents | undefined = undefined;
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
    kindEvent: new FormControl(
      0, {
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
          this.allDayChose = !this.allDayChose;
      });
  }

  ngOnInit(): void {
      this.eventService.getKindEvents().subscribe(
        data => {
          if (data.status === 200){
            this.kindOfEvents = data.data;
          }
          else if (data.status === 204) {
            this.openCustomPopUp('No hay tipos de eventos registrados en el sistema, contacte administracion')
          }
        }
      )
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de evento', 
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
    console.log(this.newAppoitmentForm)
    this.eventService.createEvent(
      this.newAppoitmentForm.get('title')?.value,
      this.newAppoitmentForm.get('location')?.value,
      this.newAppoitmentForm.get('start')?.value,
      this.newAppoitmentForm.get('finish')?.value,
      '',
      true,
      this.newAppoitmentForm.get('kindEvent')?.value,
      1).subscribe(
      data => {
        if (data.status === 200) {
          this.openCustomPopUp(data.message);
          window.location.reload();
        }
      }, 
      err => {
        // console.log('Here 2')
        // console.log(err)
        // if (err.status === 400) {
        //   this.openCustomPopUp(err.message);
        // } else if (err.status === 403) {
        //   this.openCustomPopUp(err.message);
        // } else {
        //   this.openCustomPopUp(err.message);
        // }
      }
    );
  }

}
