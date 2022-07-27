import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {

  newProjectForm = new FormGroup({
    Name: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    Description: new FormControl('', {
      validators: Validators.required
    }),
    Lider: new FormControl('',  [Validators.required, this.noWhitespaceValidator]),

    Member2: new FormControl('',  [Validators.required, this.noWhitespaceValidator]),

    Member3: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    Category: new FormControl('', {
      validators: Validators.required
    }),
    IdFair: new FormControl(false, {
      validators: Validators.required
    }),
    file: new FormControl('', [Validators.required]),
    //,
    // creatorLeader: new FormControl(false, {
    //   validators: Validators.required
    // })
  });

  projectCategory = '';

  categories = [
    {name: 'Categoria 1', value: ''},
    {name: 'Categoria 2', value: ''},
    {name: 'Categoria 3', value: ''},
  ];

  constructor(
    private ProjectsService: ProjectsService,
    private customPopUpService: CustomPopUpService
  ) { }

  public noWhitespaceValidator(control: FormControl) {
    return control.value.startsWith(" ") || this.newProjectForm.value.endsWith(" ") ? {whitespace: true} : null;
  }

  ngOnInit(): void {
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
    formData.set('Fair', '1')

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
