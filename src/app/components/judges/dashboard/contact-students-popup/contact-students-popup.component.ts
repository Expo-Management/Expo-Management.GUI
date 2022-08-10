import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contact-students-popup',
  templateUrl: './contact-students-popup.component.html',
  styleUrls: ['./contact-students-popup.component.css']
})
export class ContactStudentsPopupComponent implements OnInit {

  project_name ='Test project'
  group_members_emails = [
    'andreslml.ab@gmail.com', 'andreslml.ab@gmail.com','andreslml.ab@gmail.com'
  ]

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }
}
