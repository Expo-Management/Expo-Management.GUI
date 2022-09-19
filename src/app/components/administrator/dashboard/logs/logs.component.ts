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
        this.dataSource = data;
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay errores registrados.');
        } else {
          this.openCustomPopUp('Hubo un problema interno, por favor vuelve a intentarlo mas tarde.');
        }
      }
    );
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Bitacora del sistema', 
      message,
      undefined
      );
  }

}
