import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Judges } from 'src/app/shared/interfaces/judges';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';


@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css'],
})


export class ManageJudgesComponent implements OnInit {
  displayedColumns : string[] = [/*'userId', */'name', 'lastname', 'email', 'phoneNumber', 'institution', 'position', 'actions'];
  listOfJudges: Array<Judges> = []
  dataSource = new MatTableDataSource(this.listOfJudges);

  constructor(
    private customPopUpService: CustomPopUpService,
    private judgesServices: JudgesService) {}

  ngOnInit(): void {
    this.judgesServices.getJudges().subscribe(
      data => {
        if(data.status === 200){
          this.dataSource = new MatTableDataSource(data.data);
        }
      } ,
      err => {
        if (err.status === 204) {
          this.openCustomPopUp(err.message);
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        }else{
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
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
             }else if (err.status === 204) {
                this.openCustomPopUp(err.message);
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
            }else{
              this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
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


  
