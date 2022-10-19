import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FairService } from 'src/app/shared/services/fair.service';
import { KindEvents } from 'src/app/shared/interfaces/kind-events';
import { AddKindEventComponent } from './add-kind-event/add-kind-event.component';

@Component({
  selector: 'app-fair-kind-events',
  templateUrl: './fair-kind-events.component.html',
  styleUrls: ['./fair-kind-events.component.css']
})
export class FairKindEventsComponent implements OnInit {

  displayedColumns: string[] = [];
  listOfCategories: Array<KindEvents> = []
  dataSource = new MatTableDataSource(this.listOfCategories);
  kindOfEvents: KindEvents[] = [];

  constructor(
    private customPopUpService: CustomPopUpService,
    private FairService: FairService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'primary', 'secondary', 'buttons'];

    this.FairService.getKindEvents().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.data);
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay tipos de eventos en el sistema.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  dialogDelete(KindEventId: number): void{
    this.openCustomPopUp("¿Estás seguro de borrar el tipo de evento?").then(
      (result: boolean) => {
        this.FairService.deleteKindEvent(KindEventId).subscribe(
          data => {
            console.log(data);
            this.kindEventDeleted();
          },
          err => {
            if (err.status === 200) {
              this.kindEventDeleted();
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
            } else {
              this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      });
  }

  private kindEventDeleted() {
    this.openCustomPopUp('¡Tipo de evento eliminado!');
  }

  addKindEvents(): void  {
    this.modalService.open(AddKindEventComponent, {centered: true});
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Tipos de eventos de la Feria', 
      message,
      'administrator/fair-kind-events'
      );
  }
}
