import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FairService } from 'src/app/shared/services/fair.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  short_view: boolean = false;
  user_name: string = ''
  user_role: string = ''
  currentDays: string = '';
  user_options = [
    { 
      icon: 'supervised_user_circle',
      text: 'Profesores',
      link: 'manage-professors',
    },
    { 
      icon: 'assignment_ind',
      text: 'Jueces',
      link: 'manage-judges',
    },
    { 
      icon: 'school',
      text: 'Estudiantes',
      link: 'manage-students',
    },
  ]
  fair_options = [
    { 
      icon: 'assignment',
      text: 'Documentación de la feria',
      link: 'fair-documents',
    },
    { 
      icon: 'donut_large',
      text: 'Categorías en la feria',
      link: 'fair-categories',
    },
    { 
      icon: 'security',
      text: 'Protocolos de seguridad',
      link: 'fair-protocols',
    },
    { 
      icon: 'book',
      text: 'Tipos de eventos',
      link: 'fair-kind-events',
    },
    { 
      icon: 'calendar_today',
      text: 'Calendario de la feria',
      link: 'fair-calendar',
    },
  ]
  general_options = [
    { 
      icon: 'home',
      text: 'Principal',
      link: 'content',
    },
    { 
      icon: 'info',
      text: 'Bitacora de errores',
      link: 'logs',
    }
  ]
  account_options = [
    { 
      icon: 'settings',
      text: 'Configuraciones',
      link: '/administrator/settings',
    },
    { 
      icon: 'exit_to_app',
      text: 'Cerrar sesión',
      link: '/auth/login',
    }
  ]

  constructor(
    private observer: BreakpointObserver,
    private userInfoService: PersonalInformationService,
    private customPopUpService: CustomPopUpService,
    private tokenStorage: TokenStorageService,
    private fairService: FairService) {}
  
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
  
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.short_view = true;
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.short_view = false;
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Informacion del usuario',
      message,
      undefined
    );
  }

  closeSideBar() {
    if (this.short_view) {
      this.sidenav.close()
    }
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
