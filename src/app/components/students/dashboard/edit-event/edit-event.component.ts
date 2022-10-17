import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() public event: any;

  constructor(
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
