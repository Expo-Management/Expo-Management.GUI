import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { Files } from 'src/app/shared/interfaces/files';
import { AddFileComponent } from './add-file/add-file.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-fair-documents',
  templateUrl: './fair-documents.component.html',
  styleUrls: ['./fair-documents.component.css']
})
export class FairDocumentsComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProjects: Array<Files> = []
  dataSource = new MatTableDataSource(this.listOfProjects);

  constructor(
    private customPopUpService: CustomPopUpService,
    private FilesServices: FilesService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'size', 'uploadDateTime'];

    this.FilesServices.showFiles().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay documentos en el sistema.');
        } else {
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogDelete(name: string): void{
    this.openCustomPopUp("¿Estás seguro de borrar el documento?").then(
      (result: boolean) => {
        this.FilesServices.deleteFiles(name).subscribe(
          data => {
            console.log(data);
            this.fileDeleted();
          },
          err => {
            if (err.status === 200) {
              this.fileDeleted();
            } else {
              this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      });
  }

  private fileDeleted() {
    this.openCustomPopUp('¡Documento eliminado!');
    window.location.reload();
  }

  addFile(): void  {
    this.modalService.open(AddFileComponent, {centered: true});
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Administración de documentos', 
      message,
      'administrator/fair-documents'
      );
  }
}
