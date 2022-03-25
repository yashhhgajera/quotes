import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  myInterval = 3000;
  activeSlideIndex = 0;
  slides: {image: string; text?: string}[] = [
    {image: '../../../assets/home1.jpg'},
    {image: '../../../assets/home2.jpg'},
    {image: '../../../assets/home3.jpg'}
  ];

}
