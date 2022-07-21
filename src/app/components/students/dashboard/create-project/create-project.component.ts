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
    Name: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    Description: new FormControl('', {
      validators: Validators.required
    }),
    Leader: new FormControl('', {
      validators: Validators.required
    }),
    Member2: new FormControl('', {
      validators: Validators.required
    }),
    Member3: new FormControl('', {
      validators: Validators.required
    }),
    Category: new FormControl('', {
      validators: Validators.required
    })
    //,
    // creatorLeader: new FormControl(false, {
    //   validators: Validators.required
    // })
  });

  file!: File;

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

  ngOnInit(): void {
  }

  public createProject() 
  {
    console.log('test')
    this.ProjectsService.CreateProject(
      this.newProjectForm.controls['Name'].value,
      this.newProjectForm.controls['Description'].value,
      this.newProjectForm.controls['Leader'].value,
      this.newProjectForm.controls['Member2'].value,
      this.newProjectForm.controls['Member3'].value,
      this.file,
      1,
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

          console.log('*******************')
          console.log(this.newProjectForm);
          console.log(droppedFile.relativePath, file);

          

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
      'Creación de proyecto', 
      message,
      'student/new-project'
      );
  }

  subirProyecto() {

  }
}
