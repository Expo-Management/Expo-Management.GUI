import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  @Input() public project_number : string = '';
  httpMessage: string = '';

  FilesForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private FilesService: FilesService
  ) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.AddFiles()
    this.activeModal.close(true);
  }
     
  AddFiles(){
    var formData: FormData = new FormData();

    formData.set('file', this.FilesForm.controls['file'].value)
    this.FilesService.addFiles(
      formData
    ).subscribe(
      data => {
        console.log(data);
        this.openCustomPopUp('Documento subido exitosamente!');
       },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('Documento subido exitosamente!');
        }else{
          console.log(err)
          this.openCustomPopUp('Ocurrio un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          this.FilesForm.patchValue({
            file: file
          })
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Administración de documentos', 
      message,
      'administrator/fair-documents'
      );
  }
}
