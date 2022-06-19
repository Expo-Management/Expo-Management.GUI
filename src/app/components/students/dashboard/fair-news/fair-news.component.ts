import { Component, OnInit } from '@angular/core';
import { FairService } from 'src/app/shared/services/fair.service';

@Component({
  selector: 'app-fair-news',
  templateUrl: './fair-news.component.html',
  styleUrls: ['./fair-news.component.css']
})
export class FairNewsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'date', 'publisher'];
  dataSource: any[] = [];

  constructor(
    private projects: FairService
  ) { }

  ngOnInit(): void {
    this.projects.getNews(2).subscribe(
      data => {
        console.log(data)
        this.dataSource = data;
      },
      err => {}
    );
  }

}
