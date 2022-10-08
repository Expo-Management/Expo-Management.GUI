import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { Files } from 'src/app/shared/interfaces/files';
import { MatTableDataSource } from '@angular/material/table';
import { FilesService } from 'src/app/shared/services/files.service';
@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css'
]
})

export class DocumentationComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfFiles: Array<Files> = []
  dataSource = new MatTableDataSource(this.listOfFiles);

  constructor(
    private filesServices: FilesService,
    private customPopUpService: CustomPopUpService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [ 'name', 'size', 'uploadDateTime', 'id'];

    this.filesServices.showFiles().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay documentos en el sistema');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador o Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );

  }

  downloadFile(fileId: string): void {
    this.filesServices.getFile(fileId).subscribe(
      response => {
        console.log(response);
        let fileName = response.headers.get('content-disposition')
        ?.split(';')[1].split('=')[1];
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      err => {
        console.log("download error: " + err);
        this.openCustomPopUp('Hubo un error, por favor, intenlo más tarde.');
      }
    );
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Documentos de la feria', 
      message,
      'student/fair-documents'
      );
  }
}
