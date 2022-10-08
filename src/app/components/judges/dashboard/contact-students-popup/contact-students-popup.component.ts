import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MembersEmails } from 'src/app/shared/interfaces/members-emails';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';


@Component({
  selector: 'app-contact-students-popup',
  templateUrl: './contact-students-popup.component.html',
  styleUrls: ['./contact-students-popup.component.css']
})
export class ContactStudentsPopupComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email'];
  dataSource: MembersEmails[] = [];

  @Input() public  group_number: number = 0;
  
  constructor(
    public activeModal: NgbActiveModal,
    private projects: ProjectsService,
    private customPopUpService: CustomPopUpService,
    ) { }

  ngOnInit(): void {
    this.projects.getMembersEmail(this.group_number).subscribe(
      data => {
        this.dataSource = data;
        console.log(this.group_number);
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay estudiantes registrados.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Juez para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Correos de los estudiantes', 
      message,
      `/student/project/${this.group_number}`);
  }
}
