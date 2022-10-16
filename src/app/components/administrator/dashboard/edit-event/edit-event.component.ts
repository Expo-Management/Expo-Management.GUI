import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopUpService } from 'src/app/shared/services/confirmation-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  @Input() public event: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  user_role: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private confirmationPopUpService: ConfirmationPopUpService,
    private infoService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.user_role = this.infoService.getRole()!;
  }

  passBack() {
    this.passEntry.emit(this.event);
    this.activeModal.close(this.event);
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
