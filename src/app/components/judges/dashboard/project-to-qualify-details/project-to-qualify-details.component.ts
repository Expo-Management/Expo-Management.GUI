import { Component, OnInit } from '@angular/core';
//import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContactStudentsPopupComponent } from '../contact-students-popup/contact-students-popup.component';
import { RecomendationsPopupComponent } from '../recomendations-popup/recomendations-popup.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-project-to-qualify-details',
  templateUrl: './project-to-qualify-details.component.html',
  styleUrls: ['./project-to-qualify-details.component.css']
})
export class ProjectToQualifyDetailsComponent implements OnInit {
  project_name ='Test project'
  group_number = 1
  project_description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
  group_members = [
    'Pepito Zamora', 'Pepito Zamora','Pepito Zamora'
  ]
  category = 'Computacion'


  selectedValue = '';

  constructor(private dialog: MatDialog) { }

  openRecomendation() {
    const dialogRef = this.dialog.open(RecomendationsPopupComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  openEmails() {
    const dialogRef = this.dialog.open(ContactStudentsPopupComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

}
