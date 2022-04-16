import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  newProjectForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    description: new FormControl('', {
      validators: Validators.required
    }),
    teammate1: new FormControl('', {
      validators: Validators.required
    }),
    teammate2: new FormControl('', {
      validators: Validators.required
    }),
    category: new FormControl('', {
      validators: Validators.required
    }),
    creatorLeader: new FormControl(false, {
      validators: Validators.required
    })
  });

  projectCategory = '';

  categories = [
    {name: 'Categoria 1', value: ''},
    {name: 'Categoria 2', value: ''},
    {name: 'Categoria 3', value: ''},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
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

}
