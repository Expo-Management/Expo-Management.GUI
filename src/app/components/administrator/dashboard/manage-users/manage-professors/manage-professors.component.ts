import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Professors } from 'src/app/shared/interfaces/professors';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-manage-professors',
  templateUrl: './manage-professors.component.html',
  styleUrls: ['./manage-professors.component.css'],
})


export class ManageProfessorsComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProfessors: Array<Professors> = []
  dataSource = new MatTableDataSource(this.listOfProfessors);

  constructor(private customPopUpService: CustomPopUpService, private adminServices: AdminService) {}

  ngOnInit(): void {
    this.displayedColumns = [/*'userId', */'name', 'lastname', 'email', 'phoneNumber', 'actions'];

    this.adminServices.getAdmins().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.data);
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
        this.adminServices.deleteAdmin(email).subscribe(
          data => {
            this.adminDeleted();
          },
          err => {
            if (err.status === 200) {
              this.adminDeleted();
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

  private adminDeleted() {
    this.openCustomPopUp('¡Professor eliminado!');
    window.location.reload();
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Profesores', 
      message,
      undefined
      );
  }
  
}
