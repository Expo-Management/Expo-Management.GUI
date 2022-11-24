import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProtocolsService } from 'src/app/shared/services/protocols.service';
import { SecurityProtocols } from 'src/app/shared/interfaces/security-protocols';
import { AddProtocolComponent } from './add-protocol/add-protocol.component';
import { FairService } from 'src/app/shared/services/fair.service';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

@Component({
  selector: 'app-fair-protocols',
  templateUrl: './fair-protocols.component.html',
  styleUrls: ['./fair-protocols.component.css']
})
export class FairProtocolsComponent implements OnInit {

  displayedColumns: string[] = [];
  listOfProtocols: Array<SecurityProtocols> = []
  dataSource = new MatTableDataSource(this.listOfProtocols);
  fairId = 0;

  constructor(
    private customPopUpService: CustomPopUpService,
    private ProtocolsService: ProtocolsService,
    private FairService: FairService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.FairService.getCurentFairdId().subscribe(
      data => {
         this.fairId = data;
         this.displayedColumns = ['name', 'description', 'id'];

         this.ProtocolsService.getSecurityProtocols(this.fairId).subscribe(
          data => {
            console.log("data",data);
            this.dataSource = new MatTableDataSource(data);
          },
          err => {
            if (err.status === 400) {
              this.openCustomPopUp('No hay protocolos en el sistema.');
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador o Estudiante para acceder a esta sección.');
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

  dialogDelete(id: number): void{
    this.openCustomPopUp("¿Estás seguro de borrar el protocolo?").then(
      (result: boolean) => {
        this.ProtocolsService.deleteProtocols(id).subscribe(
          data => {
              this.protocolDeleted();
          },
          err => {
            if (err.status === 200) {
              this.protocolDeleted();
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
            } else if(err.status === 204){
              this.openCustomPopUp(err.message);
            } else if(err.status === 500){
            this.openCustomPopUp(err.message);
            }
          }
        );
      });
  }

  private protocolDeleted() {
    this.openCustomPopUp('!Protocolo eliminado!');
  }

  AddProtocol(): void  {
    this.modalService.open(AddProtocolComponent, {centered: true});
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Protocolos de la Feria', 
      message,
      'administrator/fair-protocols'
      );
  }
}
