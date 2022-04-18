import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

export interface Professors {
  name: string;
  last: string;
  email: string;
  phone: string;
  subject: string;
}

const ELEMENT_DATA: Professors[] = [
  { name: 'Andrés', last: 'Bolaños', email: 'andres.bolaños@gmail.com', phone: '888-888-888', subject: 'Redes'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888', subject: 'Programación'},
 
];

@Component({
  selector: 'app-manage-professors',
  templateUrl: './manage-professors.component.html',
  styleUrls: ['./manage-professors.component.css']
})
export class ManageProfessorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'subject', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private customPopUpService: CustomPopUpService) {}

  
  dialogDelete(): void{ //not working
    this.openCustomPopUp("¿Estás seguro de borrar el usuario?") ;
  }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Configuracion de profesores', 
      message,
      undefined
      );
  }

  ngOnInit(): void {
  }

  
}
