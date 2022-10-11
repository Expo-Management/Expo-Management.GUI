import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopUpService } from 'src/app/shared/services/confirmation-pop-up.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {

  @Input() public appointment: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private confirmationPopUpService: ConfirmationPopUpService
  ) { }

  passBack() {
    this.passEntry.emit(this.appointment);
    this.activeModal.close(this.appointment);
  }

  public openConfirmationPopUp() {
    this.confirmationPopUpService.confirm(
      'Edit appointment', 
      'Do you really want to edit this appointment?'
      )
    .then(
      (confirmed) => this.passBack()
    )
    .catch(() => alert('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.openConfirmationPopUp();
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
