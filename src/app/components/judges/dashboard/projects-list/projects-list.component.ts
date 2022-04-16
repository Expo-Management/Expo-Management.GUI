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

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
