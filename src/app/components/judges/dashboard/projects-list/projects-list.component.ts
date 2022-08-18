import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { MatTableDataSource } from '@angular/material/table';
import { Projects } from 'src/app/shared/interfaces/projects';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { OtherQualificationsComponent } from './other-qualifications/other-qualifications.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'
]
})

export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProjects: Array<Projects> = []
  dataSource = new MatTableDataSource(this.listOfProjects);
  JudgeCalification: JudgeCalification[] = [];

  constructor(
    private customPopUpService: CustomPopUpService, 
    private projectservices: ProjectsService,
    public modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.displayedColumns = ['name', 'description', 'id', 'actions'];

    this.projectservices.ShowProjects().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } ,
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay proyectos en el sistema');
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

  otherQualifications(id: number): void  {
    const modalRef = this.modalService.open(OtherQualificationsComponent, {centered: true});
    modalRef.componentInstance.id = id;
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Proyectos', 
      message,
      undefined
      );
  }

}
