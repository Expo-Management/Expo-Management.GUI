import { Component, OnInit } from '@angular/core';

/*export interface Form1 {
  name: string;
  pts: number;
  observations: string;
}*/


export interface firstColumn {
  aboutIt: string;
}

const FIRSTCOLUMN_DATA: firstColumn[] = [
  {aboutIt: 'a. Evidencia fase previa o de exploración para plantear el problema.'},
  {aboutIt: 'b. Claridad en la definición del problema.'},
  {aboutIt: 'c. Identifica el impacto del proyecto.'},
  {aboutIt: 'd. Los objetivos están bien definidos.'},
  {aboutIt: 'e. Definición de los criterios que fundamentan la solución propuesta.'},
];

const Test = [
  {
   pts: 0,
   observations: ''
  },
  {
   pts: 0,
   observations: ''
  },
  {
  pts: 0,
  observations: ''
  },
  {
  pts: 0,
  observations: ''
  },
  {
   pts: 0,
   observations: ''
  },
];

const test_schema = [
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];


//Primer Form
const ELEMENT_DATA = [
  {name: 'a.	Evidencia fase previa o de exploración para plantear el problema.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Claridad en la definición del problema.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Identifica el impacto del proyecto.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Los objetivos están bien definidos.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Definición de los criterios que fundamentan la solución propuesta.',
   pts: 0,
   observations: ''
  },
];

const COLUMNS_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "I.	Planteamiento del problema, cada aspecto vale 2 ptos. Total 10 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Segundo Form
const FORM_2 = [
  {name: 'a.	El proyecto responde a una necesidad evidente.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Se identifican los grupos beneficiados.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	El proyecto es factible de ser realizado.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Es aplicable y tiene un buen nivel de uso potencial.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Realiza un aporte en el campo de estudio.',
   pts: 0,
   observations: ''
  },
  {name: 'f.	Identifica el impacto potencial en el campo de la ciencia, sociedad, economía o el ambiente.',
   pts: 0,
   observations: ''
  },
];

const FORM_2_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "II.	Justificación del proyecto, cada aspecto vale 3 ptos. Total 18 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Tercer Form
const FORM_3 = [
  {name: 'a.	Demuestra que el desarrollo es de elaboración propia.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	El proyecto es una innovación y lo demuestra.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Muestra actualidad tecnológica o nuevo conocimiento científico o técnico.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Identifica una solución.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Desarrollo de un prototipo/modelo/producto.',
   pts: 0,
   observations: ''
  },
];

const FORM_3_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "III.	Originalidad y creatividad del proyecto, cada aspecto vale 2 ptos. Total 10 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Cuarto Form
const FORM_4 = [
  {name: 'a.	Demuestra apropiación (familiaridad y capacidad de manejo)  de los contenidos  que fundamentan el proyecto.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Define los conceptos que utiliza de manera clara y precisa.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Presenta una síntesis apropiada de lo que se conoce del tema en estudio.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Presenta diseños y esquemas claros y correctos.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Fundamenta todas las demostraciones y cálculos necesarios.',
   pts: 0,
   observations: ''
  },
  {name: 'f.	Muestra documentación de apoyo (referencias información extraída).',
   pts: 0,
   observations: ''
  },
];

const FORM_4_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "IV.	Fundamento teórico, cada aspecto vale 2 ptos. Total 12 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Quinto Form
const FORM_5 = [
  {name: 'a.	Selección de instrumentos (modelos, programas de computación, equipos y otros) y métodos adecuados.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Describe la metodología utilizada para la obtención de posibles soluciones.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Cumplimiento de las etapas planificadas en el diseño del proyecto.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Hace un uso óptimo de los recursos.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Describe las metodologías de evaluación y perfeccionamiento.',
   pts: 0,
   observations: ''
  },
  {name: 'f.	Identifica posibles puntos de riesgo.',
   pts: 0,
   observations: ''
  },
];

const FORM_5_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "V.	Metodología, cada aspecto vale 3 ptos. Total 18 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Sexto Form
const FORM_6 = [
  {name: 'a.	Coherencia de los objetivos con los resultados obtenidos.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Realiza análisis de los resultados.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Los resultados (o el producto) tienen aplicación o utilidad en la vida real.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Congruencia de los datos, tablas, diagramas y gráficos con el tema investigado.',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Sugiere posibles aplicaciones del desarrollo obtenido (innovación).',
   pts: 0,
   observations: ''
  },
  {name: 'f.	Coherencia de los diseños y esquemas con respecto al prototipo/modelo/producto presentado.',
   pts: 0,
   observations: ''
  },
  {name: 'g.	Prototipo/modelo/producto ha sido probado en varias condiciones/ensayos.',
   pts: 0,
   observations: ''
  },
  {name: 'h.	Prototipo/modelo/producto demuestra conocimientos de ingeniería y coherencia.',
   pts: 0,
   observations: ''
  },
];

const FORM_6_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "VI.	Discusión, interpretación y análisis, cada aspecto vale 2 ptos. Total 16 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Septimo Form
const FORM_7 = [
  {name: 'a.	El cartel apoya la comunicación en forma fluida.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	El material expuesto tiene relación con el trabajo de investigación.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Claridad de las ideas durante la presentación.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Presenta  una organización lógica de las ideas (contenido claro y específico).',
  pts: 0,
  observations: ''
  },
  {name: 'e.	Capacidad de síntesis para llevar a cabo la comunicación.',
   pts: 0,
   observations: ''
  },
  {name: 'f.	La presentación refleja el esfuerzo coordinado de los integrantes del equipo.',
   pts: 0,
   observations: ''
  },
];

const FORM_7_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "VII.	Presentación e interacción del proyecto, cada aspecto vale 2 ptos. Total 12 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

//Octavo Form
const FORM_8 = [
  {name: 'a.	Exhibe en su stand la bitácora con los datos requeridos.',
   pts: 0,
   observations: ''
  },
  {name: 'b.	Muestra las fechas en las que realizó experimentos.',
   pts: 0,
   observations: ''
  },
  {name: 'c.	Evidencia mediciones, diagramas, figuras, cuadros, dibujos.',
  pts: 0,
  observations: ''
  },
  {name: 'd.	Evidencia la aplicación de algún tipo de estadística, sumas, porcentajes, entre otros.',
  pts: 0,
  observations: ''
  },
];

const FORM_8_SCHEMA = [
  {
      key: "name",
      type: "text",
      label: "VIII.	Presentación documentación adicional del proyecto, cada aspecto vale 1 punto.  Total 4 pts."
  },
  {
      key: "pts",
      type: "number",
      label: "Puntos Asignados"
  },
  {
      key: "observations",
      type: "text",
      label: "Observaciones"
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];


@Component({
  selector: 'app-qualify-project',
  templateUrl: './qualify-project.component.html',
  styleUrls: ['./qualify-project.component.css']
})
export class QualifyProjectComponent implements OnInit {
  //Primer Form
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  sub_total_1 = 10
  //Segundo Form
  displayedColumns2: string[] = FORM_2_SCHEMA.map((col) => col.key);
  dataSource2 = FORM_2;
  columnsSchema2: any = FORM_2_SCHEMA;
  sub_total_2 = 18
  //Tercer Form
  displayedColumns3: string[] = FORM_3_SCHEMA.map((col) => col.key);
  dataSource3 = FORM_3;
  columnsSchema3: any = FORM_3_SCHEMA;
  sub_total_3 = 10
  //Cuarto Form
  displayedColumns4: string[] = FORM_4_SCHEMA.map((col) => col.key);
  dataSource4 = FORM_4;
  columnsSchema4: any = FORM_4_SCHEMA;
  sub_total_4 = 12
  //Quinto Form
  displayedColumns5: string[] = FORM_5_SCHEMA.map((col) => col.key);
  dataSource5 = FORM_5;
  columnsSchema5: any = FORM_5_SCHEMA;
  sub_total_5 = 18
  //Sexto Form
  displayedColumns6: string[] = FORM_6_SCHEMA.map((col) => col.key);
  dataSource6 = FORM_6;
  columnsSchema6: any = FORM_6_SCHEMA;
  sub_total_6 = 16
  //Septimo Form
  displayedColumns7: string[] = FORM_7_SCHEMA.map((col) => col.key);
  dataSource7 = FORM_7;
  columnsSchema7: any = FORM_7_SCHEMA;
  sub_total_7 = 12
  //Octavo Form
  displayedColumns8: string[] = FORM_8_SCHEMA.map((col) => col.key);
  dataSource8 = FORM_8;
  columnsSchema8: any = FORM_8_SCHEMA;
  sub_total_8 = 4




  displayedColumnsTest: string[] = ['aboutIt'];
  datasourceTest = FIRSTCOLUMN_DATA;
  displayedColumnsTestTest: string[] = test_schema.map((col) => col.key );
  datasourceTestTest = Test;
  columnsSchemaTest: any = test_schema;




  
  judge_name ='Andrés'
  judge_last_1 = 'Barrantes'
  judge_last_2 = 'Sánchez'
  date = '17/04/2022'
  projectName = 'Proyecto'

  constructor() { }

  ngOnInit(): void {
  }

}