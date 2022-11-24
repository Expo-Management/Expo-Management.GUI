import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { FairService } from 'src/app/shared/services/fair.service';

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
    Name: new FormControl('', {
      validators: [
        Validators.required, this.noWhitespaceValidator,
        Validators.maxLength(70),
        Validators.minLength(3)
      ]
    }),
    Description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(400),
        Validators.minLength(10)
      ]
    }),
    Lider: new FormControl('', {
      validators: [
        Validators.required, this.noWhitespaceValidator,
        Validators.email,
        Validators.maxLength(100),
        Validators.minLength(10)
      ]
    }),
    Member2: new FormControl('', {
      validators: [
        Validators.required, this.noWhitespaceValidator,
        Validators.email,
        Validators.maxLength(100),
        Validators.minLength(10)
      ]
    }),
    Member3: new FormControl('', {
      validators: [
        Validators.required, this.noWhitespaceValidator,
        Validators.email,
        Validators.maxLength(100),
        Validators.minLength(10)
      ]
    }),
    file: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    IdFair: new FormControl(false, {
      validators: [
        Validators.required
      ]
    }),

    Category: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
  });

  fairId = '';
  categories!: Categories[];

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.newProjectForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private ProjectsService: ProjectsService,
    private CategoriesService: CategoriesService,
    private FairService: FairService,
    private customPopUpService: CustomPopUpService
  ) { }

  ngOnInit(): void {
    this.FairService.getCurentFairdId().subscribe(
      data => {
        console.log(data);
         this.fairId = data;
      },
      err => {
        console.log('an error occured: ' + err);
        if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      })
     
      this.CategoriesService.getAllCategories().subscribe(
        data => {
          console.log(data);
          this.categories = data;
        },
        err => {
          if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
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
        } else if (err.status === 204) {
          this.openCustomPopUp(err.message);
        } else if (err.status === 400) {
          this.openCustomPopUp(err.message);
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
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
      'student/current-projects'
      );
  }
}
