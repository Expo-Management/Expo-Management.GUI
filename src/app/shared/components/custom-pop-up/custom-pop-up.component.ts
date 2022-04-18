import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-pop-up',
  templateUrl: './custom-pop-up.component.html',
  styleUrls: ['./custom-pop-up.component.css']
})
export class CustomPopUpComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() link: string | undefined;
  @Input() btnOkText: string | undefined;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public accept() {
    this.activeModal.close(true);
    if (this.link !== undefined || this.link !== null) {
      this.router.navigate([this.link]);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }


}
