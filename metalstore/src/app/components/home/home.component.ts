import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Hammer from 'hammerjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private carousel: HTMLElement | null = null;
  private hammer: HammerManager | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.carousel = this.el.nativeElement.querySelector('#homeBannerCarousel');

    if (this.carousel) {
      this.initializeHammer();
    }
  }

  private initializeHammer() {
    if (!this.carousel) return;

    // Initialize Hammer
    this.hammer = new Hammer(this.carousel);

    // Enable only horizontal panning
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    // Handle pan events
    this.hammer.on('panleft', () => this.moveCarousel('next'));
    this.hammer.on('panright', () => this.moveCarousel('prev'));
  }

  private moveCarousel(direction: 'next' | 'prev') {
    const carousel = this.carousel;
    if (!carousel) return;

    // Use Bootstrap's carousel method
    const bootstrapCarousel = bootstrap.Carousel.getInstance(carousel);

    if (bootstrapCarousel) {
      direction === 'next'
        ? bootstrapCarousel.next()
        : bootstrapCarousel.prev();
    }
  }

  // Optional: Clean up Hammer instance when component is destroyed
  ngOnDestroy() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }
}

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [
//     RouterModule
//   ],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }
