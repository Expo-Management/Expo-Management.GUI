import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project_name ='Test project'
  group_number = 1
  project_description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
  group_members = [
    'Pepito Zamora', 'Pepito Zamora','Pepito Zamora'
  ]
  category = 'Computacion'
  qualification = 100

  selectedValue = '';

  judges = [
    {name: 'Juan el juez', value: ''},
    {name: 'Juan el juez', value: ''},
    {name: 'Juan el juez', value: ''},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
