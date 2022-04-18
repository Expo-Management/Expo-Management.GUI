import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

export interface Judges {
  name: string;
  last: string;
  email: string;
  phone: string;
  institution: string;
}

const ELEMENT_DATA: Judges[] = [
  { name: 'Andrés', last: 'Bolaños', email: 'andres.bolaños@gmail.com', phone: '888-888-888', institution: 'Colegio Técnico Profesional Mario Quirós Sasso'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888', institution: 'vacio'},
 
];

@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css'],
})


export class ManageJudgesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'institution', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private customPopUpService: CustomPopUpService) {}

  ngOnInit(): void {}

  dialogDelete(): void{ //not working
    this.openCustomPopUp("¿Estás seguro de borrar el usuario?") ;
  }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Configuracion de jueces', 
      message,
      undefined
      );
  }
  
}


  
