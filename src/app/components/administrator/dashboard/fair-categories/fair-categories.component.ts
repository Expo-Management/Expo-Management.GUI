import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-fair-categories',
  templateUrl: './fair-categories.component.html',
  styleUrls: ['./fair-categories.component.css']
})
export class FairCategoriesComponent implements OnInit {

  displayedColumns: string[] = [];
  listOfCategories: Array<Categories> = []
  dataSource = new MatTableDataSource(this.listOfCategories);

  constructor(
    private customPopUpService: CustomPopUpService,
    private CategoriesService: CategoriesService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'description', 'buttons'];

    this.CategoriesService.getAllCategories().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        if (err.status === 404) {
          this.openCustomPopUp('No hay categorías en el sistema.');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    );
  }

  dialogDelete(id: number): void{
    this.openCustomPopUp("¿Estás seguro de borrar la categoría?").then(
      (result: boolean) => {
        this.CategoriesService.deleteCategory(id).subscribe(
          data => {
            console.log(data);
            this.categoryDeleted();
          },
          err => {
            if (err.status === 200) {
              this.categoryDeleted();
            } else if (err.status === 403) {
              this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
            } else {
              this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
            }
          }
        );
      });
  }

  private categoryDeleted() {
    this.openCustomPopUp('¡Categoría eliminada!');
  }

  addCategory(): void  {
    this.modalService.open(AddCategoryComponent, {centered: true});
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Categorías de la Feria', 
      message,
      'administrator/fair-categories'
      );
  }
}
