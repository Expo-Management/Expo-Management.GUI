import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';
import { Judges } from '../../fair-documents/fair-documents.component';


@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css'],
})


export class ManageJudgesComponent implements OnInit {
<<<<<<< HEAD
  displayedColumns : string[] = [];
  listOfJudges: Array<Judges> = []
  dataSource = new MatTableDataSource(this.listOfJudges);
=======
  displayedColumns : string[] = ['name', 'lastname', 'email', 'phoneNumber', 'institution', 'actions'];
  dataSource : any[] = [];
>>>>>>> f2821711c370afad2b2f85da58541063f89bc7cf

  constructor(
    private customPopUpService: CustomPopUpService,
    private judgesServices: JudgesService) {}

  ngOnInit(): void {
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


  
