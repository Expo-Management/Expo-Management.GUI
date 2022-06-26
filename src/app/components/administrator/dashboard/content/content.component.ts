import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { LogsService } from 'src/app/shared/services/logs.service';

/*export interface Errors {
  id: string;
  name: string;
  date: string;
  description: string;
}

const ELEMENT_DATA: Errors[] = [
  {id: '002', name: 'Fallo al actualizar datos', date: '04/13/2022', description: 'El estudiante Andrés Barrantes tuvo un fallo al actualizar los datos de su proyecto'},
  {id: '007', name: 'Fallo al subir calificación', date: '04/16/2022', description: 'El juez Eduardo Castillo tuvo un fallo al subir la calificación del proyecto TrackerBar'},

];*/

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource : any[] = [];

  constructor(private customPopUpService: CustomPopUpService, private logServices: LogsService) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'message', 'level', 'timeStamp'];

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
