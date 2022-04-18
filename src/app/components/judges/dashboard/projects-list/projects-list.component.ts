import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  description: string;
  groupLeader: string;
  category: string;
  qualify: string;
}

const ELEMENT_DATA: User[] = [
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
  {name: 'Proyecto', description: 'Descripcion del proyecto', groupLeader: 'Andrés Barrantes', category: 'Tecnologico', qualify: 'Ver opciones'},
];

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'
]
})

export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'groupLeader', 'category', 'qualify'];
  dataSource = ELEMENT_DATA;

  cateogories: string[] = [
    'Tecnologico',
    'Quimico',
    'Artistico',
    'Social',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
