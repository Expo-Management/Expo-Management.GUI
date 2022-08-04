import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { Categories } from 'src/app/shared/interfaces/categories';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {

  public noWhitespaceValidator(control: FormControl) {
    return control.value.startsWith(" ") || control.value.endsWith(" ") ? {whitespace: true} : null;
};
  
  newProjectForm = new FormGroup({
    Name: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    Description: new FormControl('', {validators: Validators.required}),

    Lider: new FormControl('',  [Validators.required, this.noWhitespaceValidator]),

    Member2: new FormControl('',  [Validators.required, this.noWhitespaceValidator]),

    Member3: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    file: new FormControl('', [Validators.required]),

    IdFair: new FormControl(false, {validators: Validators.required}),

    Category: new FormControl('', [Validators.required]),
    //,
    // creatorLeader: new FormControl(false, {
    //   validators: Validators.required
    // })
  });

  fairId = '';
  categories!: Categories[];

  constructor(
    private ProjectsService: ProjectsService,
    private customPopUpService: CustomPopUpService
  ) { }

  ngOnInit(): void {
    this.ProjectsService.getCurentFairdId().subscribe(
      data => {
        console.log(data);
         this.fairId = data;
      },
      err => {
        console.log('an error occured: ' + err);
      })
     
      this.ProjectsService.getAllCategories().subscribe(
        data => {
          console.log(data);
          this.categories = data;
        },
        err => {
          console.log('an error occured: ' + err);
        }
        
      )
  }

  public createProject() 
  {
    var formData: FormData = new FormData();

    formData.set('Name', this.newProjectForm.controls['Name'].value)
    formData.set('Description', this.newProjectForm.controls['Description'].value)
    formData.set('Lider', this.newProjectForm.controls['Lider'].value)
    formData.set('Member2', this.newProjectForm.controls['Member2'].value)
    formData.set('Member3', this.newProjectForm.controls['Member3'].value)
    formData.set('Files', this.newProjectForm.controls['file'].value)
    formData.set('Fair', this.fairId)
    formData.set('Category', this.newProjectForm.controls['Category'].value)
    this.ProjectsService.CreateProject(
      formData
    ).subscribe(
      data => {
        console.log(data);
        this.openCustomPopUp('Proyecto creado exitosamente!');
      },
      err => {
        console.log(err)
        if (err.status === 200) {
          this.openCustomPopUp('Proyecto creado exitosamente!');
        } else {
          this.openCustomPopUp('Hubo un error, por favor, intenlo más tarde.');
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

          this.newProjectForm.patchValue({
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

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de proyectos', 
      message,
      'student/new-project'
      );
  }
}
