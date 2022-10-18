import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';

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
    private infoService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.user_role = this.infoService.getRole()!;
  }

  passBack() {
    this.passEntry.emit(this.event);
    this.activeModal.close(this.event);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
