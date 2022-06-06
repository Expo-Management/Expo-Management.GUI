import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';

export interface Judges {
  id: string
  name: string;
  lastname: string;
  email: string;
  phone: string;
  institution: string;
}

@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css'],
})


export class ManageJudgesComponent implements OnInit {
  displayedColumns : string[] = [];
  dataSource : any[] = [];

  constructor(
    private customPopUpService: CustomPopUpService,
    private judgesServices: JudgesService) {}

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastname', 'email', 'phoneNumber', 'institution', 'actions'];

    this.judgesServices.getJudges().subscribe(
      data => {
        this.dataSource = data;
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('There are no judges registered.');
        } else {
          this.openCustomPopUp('There was an internal problem, try again later.');
        }
      }
    );
  }

  dialogDelete(email: string): void{
    this.openCustomPopUp("¿Estás seguro de borrar el usuario?").then(
      (result: boolean) => {
        this.judgesServices.deleteJudge(email).subscribe(
          data => {
            this.judgeDeleted();
          },
          err => {
            if (err.status === 200) {
              this.judgeDeleted();
            } else {
              this.openCustomPopUp('There was an internal problem, try again later.');
            }
          }
        );
      });
  }

  private judgeDeleted() {
    this.openCustomPopUp('Judge deleted!');
    window.location.reload();
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Configuracion de jueces', 
      message,
      undefined
      );
  }
}


  
