import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from './course.service'

@Component({
  // selector: "app-course-list", // -> usado agora via link de rotas
  templateUrl: "./course-list.component.html"
})


export class CourseListComponent implements OnInit {
  // array para lista de cursos

  filteredCourses: Course[] = [];

  _courses: Course[] = [];

  _filterBy: string; // não deve ser alterada e usada somente aqui

  constructor(private courseService: CourseService) { }
  //propriedade para ciclo de vida do componente, necessário implementar o método OnInit
  ngOnInit(): void {
    this.retrieveAll();
  }
  
  retrieveAll(): void {
    this.courseService.retrieveALL().subscribe({
      next: courses => {
        this._courses = courses;
        this.filteredCourses = this._courses;
      },
      error: err => console.log('Error', err)
    })
  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe ({
      next: () => {
        console.log('Deleted with success');
        this.retrieveAll();
      },
      error: err => console.log('Erro', err)
    })
  }

  //usado quando digitamos no input de pesquisa
  set filter(value: string) {
    this._filterBy = value;

    this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1 );
  }

  //usando quando o input for atualizado
  get filter() {
    return this._filterBy;
  }
}
