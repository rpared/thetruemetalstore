import { Routes } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {path: '', component: HomeComponent,},
      { path: 'albums', component: AlbumListComponent },
      { path: 'about', component: AboutComponent },
      { path: 'reviews', component: ReviewsComponent},
      { path: 'cart', component: CartComponent},
      { path: 'checkout', component: CheckoutComponent},
      

];
