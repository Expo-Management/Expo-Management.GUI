import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { JudgeCalification } from 'src/app/shared/interfaces/judge-calification';


@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})

export class QualificationComponent implements OnInit {

  displayedColumns: string[] = ['judgeName', 'punctuation'];
  dataSource: JudgeCalification[] = [];
  sub_total = 10

  @Input() public  judgesCalifications: JudgeCalification[] = [];

  constructor(public activeModal: NgbActiveModal, 
    private customPopUpService: CustomPopUpService, 
    private projectService: ProjectsService) { }

  ngOnInit(): void {
    console.log(this.judgesCalifications)
    this.dataSource = this.judgesCalifications;
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

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Desglose de la nota', 
      message,
      `/student/project/${this.judgesCalifications}`);
  }
}
