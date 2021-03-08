import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

  // torna a variavel legivel para receber informações externas
  @Input()
  rating: number = 0;

  starWidth: number;

  // constructor() { }

  ngOnChanges(): void {
    this.starWidth = this.rating * 74 / 5; // calculo para proporção que a div vai ser exibida ou não
  }

}