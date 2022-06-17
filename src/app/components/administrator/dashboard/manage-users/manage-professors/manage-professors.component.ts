import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { AdminService } from 'src/app/shared/services/admin.service';


@Component({
  selector: 'app-manage-professors',
  templateUrl: './manage-professors.component.html',
  styleUrls: ['./manage-professors.component.css'],
})


export class ManageProfessorsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource : any[] = [];

  constructor(private customPopUpService: CustomPopUpService, private adminServices: AdminService) {}

  ngOnInit(): void {
    this.displayedColumns = ['name', 'lastname', 'email', 'phoneNumber', 'actions'];

    this.adminServices.getAdmins().subscribe(
      data => {
        this.dataSource = data;
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay profesores registrados.');
        } else {
          this.openCustomPopUp('Hubo un problema interno, por favor vuelve a intentarlo mas tarde.');
        }
      }
    );
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
            } else {
              this.openCustomPopUp('Hubo un problema interno, por favor vuelve a intentarlo mas tarde.');
            }
          }
        );
      });
  }

  private adminDeleted() {
    this.openCustomPopUp('Professor eliminado!');
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
