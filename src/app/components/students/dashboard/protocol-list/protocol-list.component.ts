import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityProtocols } from 'src/app/shared/interfaces/security-protocols';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
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

  constructor(
    private customPopUpService: CustomPopUpService, 
    private fair: FairService
  ) { }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Proyectos', 
      message,
      undefined
      );
  }

  ngOnInit(): void {
    
    this.fair.getSecurityProtocols(2).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay protocolos en el sistema');
        } else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

}
