import { Component, Input, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-other-qualifications',
  templateUrl: './other-qualifications.component.html',
  styleUrls: ['./other-qualifications.component.css']
})
export class OtherQualificationsComponent implements OnInit {
  displayedColumns: string[] = [];
  listOfProjects: Array<JudgeCalification> = []
  dataSource = new MatTableDataSource(this.listOfProjects);

  @Input() public  id!: number;

  constructor(
    private customPopUpService: CustomPopUpService,
    private ProjectsService: ProjectsService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

  this.displayedColumns = ['judgeName', 'punctuation'];

    this.ProjectsService.getProjectQualifications(this.id).subscribe(
      data => {
        // data.forEach((qualifications)  => {
        //   this.dataSource.push({
        //     judgeName: qualifications.judgeName,
        //     punctuation: qualifications.punctuation
        //   }) 
        //  });
        this.dataSource = new MatTableDataSource(data);
         console.log(this.dataSource)
    },
  err => {
  console.log(err);
      }
      );
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public decline() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.accept()
  }

  public accept() {
    this.activeModal.close(true);
  }
  
 public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Proyectos a calificar', 
      message,
      'judges/projects-list'
      );
  }
}
