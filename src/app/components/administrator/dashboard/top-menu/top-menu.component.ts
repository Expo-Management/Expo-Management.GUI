import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FairService } from 'src/app/shared/services/fair.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  user_name: string = ''
  user_role: string = ''
  currentDays: string = '';

  constructor(
    private userInfoService: PersonalInformationService,
    private customPopUpService: CustomPopUpService,
    private tokenStorage: TokenStorageService,
    private fairService: FairService) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Informacion del usuario',
      message,
      undefined
    );
  }

  ngOnInit(): void {
    this.user_role = this.userInfoService.getRole()!;
    this.userInfoService.getUserFullName(this.userInfoService.getEmail()).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.user_name = data;
        } else if (data.status === 404) {
          this.openCustomPopUp('Informacion de usuario no encontrada por favor inicie sesion de nuevo.');
        }
      },
      err => {
        if (err.status === 500) {
          this.openCustomPopUp('Hubo un error en el servidor, contacte administracion.');
        } else if (err.status === 200) {
          this.user_name = err.error.text;
        } else {
          this.openCustomPopUp('Hubo un error por favor inicie sesion de nuevo.');
        }
      }
    )

    this.fairService.getCurentFairdId().subscribe(
      data => {
        if (data == 0) {
          this.currentDays = 'Crear Feria'
        } else {
          this.fairService.getCurrentFairDays().subscribe(
            data => {
              this.currentDays = data;
              console.log(this.currentDays);
            },
            err => {
              this.currentDays = '0';
              if (err.status === 500) {
                this.openCustomPopUp('Hubo un error en el servidor, contacte administracion.');
              } else if (err.status === 200) {
                this.currentDays = err.error.text;
              } else {
                console.log('err: ' + err)
              }
            }
          )
        }
      }
    )
  }

  logout() {
    this.tokenStorage.signOut();
  }

  public addFair() {
    this.fairService.addFair().subscribe(
      data => {
        this.openCustomPopUp('La feria ha iniciado exitosamente!.');
        console.log(data);
      },
      err => {
        if (err.status === 500) {
          this.openCustomPopUp('Hubo un error en el servidor, contacte administracion.');
        } else if (err.status === 200) {
          console.log('err: ' + err)
        }
      }
    )
  }
}
