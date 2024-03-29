import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JudgesDetails } from 'src/app/shared/interfaces/judges-details';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';

export interface Jueces {
  juez: string;
  posicion: string;
  institucion: string;
  apuntes: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['juez', 'email', 'phoneNumber', 'institucion', 'posicion'];
  listOfJudges: Array<JudgesDetails> = []
  dataSource = new MatTableDataSource(this.listOfJudges);
                            
  constructor(
    private customPopUpService: CustomPopUpService,
    private authService: AuthService,
    private judgesServices: JudgesService) { }

  ngOnInit(): void {
    this.judgesServices.getJudges().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay jueces registrados.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesion con una cuenta con rol de Juez o Administrador para acceder a esta seccion.');
        }
        else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );    
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Lista de jueces', 
      message,
      'judges'
      );
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}