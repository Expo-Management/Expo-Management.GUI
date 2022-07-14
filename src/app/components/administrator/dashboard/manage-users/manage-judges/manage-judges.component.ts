import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';
import { Judges } from 'src/app/shared/interfaces/judges';


@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css'],
})


export class ManageJudgesComponent implements OnInit {
  displayedColumns : string[] = [];
  listOfJudges: Array<Judges> = []
  dataSource = new MatTableDataSource(this.listOfJudges);

  constructor(
    private customPopUpService: CustomPopUpService,
    private judgesServices: JudgesService) {}

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastname', 'email', 'phoneNumber', 'institution', 'actions'];

    this.judgesServices.getJudges().subscribe(
      data => {
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
              this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      });
  }

  private judgeDeleted() {
    this.openCustomPopUp('¡Juez eliminado!');
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


  
