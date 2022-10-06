import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityProtocols } from 'src/app/shared/interfaces/security-protocols';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProtocolsService } from 'src/app/shared/services/protocols.service';
import { FairService } from 'src/app/shared/services/fair.service';

@Component({
  selector: 'app-protocol-list',
  templateUrl: './protocol-list.component.html',
  styleUrls: ['./protocol-list.component.css']
})
export class ProtocolListComponent implements OnInit {
  displayedColumns = ['name', 'description'];
  listOfProtocols: Array<SecurityProtocols> = []
  dataSource = new MatTableDataSource(this.listOfProtocols);
  fairId: number = 0;

  constructor(
    private customPopUpService: CustomPopUpService, 
    private ProtocolsService: ProtocolsService,
    private FairService: FairService
  ) { }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Proyectos', 
      message,
      undefined
      );
  }

  ngOnInit(): void {
    this.FairService.getCurentFairdId().subscribe(
      data => {
         this.fairId = data;
         console.log('1fair id:'+this.fairId)

         this.ProtocolsService.getSecurityProtocols(this.fairId).subscribe(
          data => {
            this.dataSource = new MatTableDataSource(data);
          } ,
          err => {
            if (err.status === 404) {
              this.openCustomPopUp('No hay protocolos en el sistema');
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
            } else {
              this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      
      },
      err => {
        console.log('an error occured: ' + err);
      })
  }

}
