import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JudgesDetails } from 'src/app/shared/interfaces/judges-details';
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
  displayedColumns: string[] = ['juez', 'posicion', 'institucion' ];
  listOfJudges: Array<JudgesDetails> = []
  dataSource = new MatTableDataSource(this.listOfJudges);
  // dataSource = ELEMENT_DATA;
                            
  constructor(
    private customPopUpService: CustomPopUpService,
    private judgesServices: JudgesService) { }

  ngOnInit(): void {
    this.judgesServices.getJudges().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay jueces registrados.');
        } else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );    
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Lista de jueces', 
      message,
      undefined
      );
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}