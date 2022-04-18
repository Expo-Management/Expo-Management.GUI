import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(public dialogRef: MatDialogRef<ContactStudentsPopupComponent>) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
  }

}
