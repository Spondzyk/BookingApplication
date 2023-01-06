import {Component} from '@angular/core';

@Component({
  selector: 'app-ranking-star',
  templateUrl: './ranking-star.component.html',
  styleUrls: ['./ranking-star.component.scss']
})
export class RankingStarComponent {
  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];


  selectStar(value: number): void {
    this.stars.filter((star) => {
      if (star.id <= value) {
        star.class = 'star-black star';
      } else {
        star.class = 'star-gray star';
      }
      return star;
    });

    this.selectedRating = value;

  }
}
