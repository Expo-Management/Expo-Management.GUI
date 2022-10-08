import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpComponent } from '../components/custom-pop-up/custom-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class CustomPopUpService {
  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    link: string | undefined,
    btnOkText: string = 'OK',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
      const modalRef = this.modalService.open(CustomPopUpComponent, { size: dialogSize, centered: true });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.link = link;
      modalRef.componentInstance.btnOkText = btnOkText;

      return modalRef.result;
  }
}
