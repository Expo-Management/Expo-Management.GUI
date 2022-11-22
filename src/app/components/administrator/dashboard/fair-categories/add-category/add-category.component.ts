import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  httpMessage: string = '';

  categoryForm = new FormGroup({
    descriptionForm: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2),
      ]
    })
  });

  constructor(
    public activeModal: NgbActiveModal,
    private customPopUpService: CustomPopUpService,
    private CategoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
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
    this.createCategory()
    this.activeModal.close(true);
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación de categorías',
      message,
      'administrator/fair-categories');
  }

  public errorValidator = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  createCategory() {
    this.CategoriesService.addCategory(
      this.categoryForm.get('descriptionForm')?.value).subscribe(
        data => {
          console.log(data)
          this.openCustomPopUp('Categoría creada exitosamente!');
        },
        err => {
          console.log(err)
          if (err.status == 400) {
            this.openCustomPopUp('Revise los datos ingresados');
          } else if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        }
      )
  }
}
