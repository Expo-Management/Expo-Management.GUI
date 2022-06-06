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
        console.log(data);
        this.dataSource = data;
      }
    );
  }

  dialogDelete(email: string): void{
    this.openCustomPopUp("¿Estás seguro de borrar el usuario?") ;
  }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Configuracion de jueces', 
      message,
      undefined
      );
    console.log('here')
  }
  
}


  
