import { Component, OnInit } from '@angular/core';
import { ReviewsService, IReview } from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  reviews: IReview[] = [];

  constructor(private reviewService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((data) => this.reviews = data);
  }

  ngOnDestroy(): void {
    this.reviewService.deleteReview(1).subscribe((data) => this.reviews = data);
  }



}
