import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-recomendations-popup',
  templateUrl: './recomendations-popup.component.html',
  styleUrls: ['./recomendations-popup.component.css']
})
export class RecomendationsPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecomendationsPopupComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
