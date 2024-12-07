import { Component, OnInit } from '@angular/core';
import { ReviewsService, IReview } from '../../services/reviews.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  reviews: IReview[] = [];
  p: number = 1; // Current page number
  itemsPerPage: number = 9; // Number of items per page

  constructor(private reviewService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((data) => this.reviews = data);
  }

  ngOnDestroy(): void {
    this.reviewService.deleteReview(1).subscribe((data) => this.reviews = data);
  }



}
