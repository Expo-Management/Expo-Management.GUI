import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { LogsService } from 'src/app/shared/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource : any[] = [];

  constructor(private customPopUpService: CustomPopUpService, private logServices: LogsService) { }

  ngOnInit(): void {
    this.displayedColumns = ['message', 'level', 'timeStamp'];

    this.logServices.getLogs().subscribe(
      data => {
        this.dataSource = data.data;
      } ,
      err => {
        if (err.status === 204) {
          this.openCustomPopUp('No hay errores registrados.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Bitacora del erroes', 
      message,
      undefined
      );
  }

}
