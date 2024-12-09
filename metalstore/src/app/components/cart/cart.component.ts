// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AlbumService } from '../../services/album.service';
// import { IAlbum } from '../album-list/album-list.component';
// import { RouterLink, } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule,
//     RouterLink,
//   ],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })
// export class CartComponent implements OnInit {
//   cartItems: IAlbum[] = [];
//   total: number = 0;
//   message: string = 'Thank you for shopping with us! Your order has been placed, but do not expect it please 😁.';

//   constructor(private albumService: AlbumService) {}

//   ngOnInit(): void {
//     // Initialize cart items when component loads
//     this.loadCartItems();
//   }

//   loadCartItems(): void {
//     this.cartItems = this.albumService.getCart();
//     this.calculateTotal();
//   }

//   calculateTotal(): void {
//     this.total = this.cartItems.reduce((sum, item) => 
//       sum + (item.price * (item.quantity || 1)), 0);
//   }

//   removeFromCart(album: IAlbum): void {
//     const result = this.albumService.removeFromCart(album);
//     if (result.success) {
//       this.loadCartItems();
//       console.log(`Removed ${album.title} from cart`);
//     }
//   }

//   clearCart(): void {
//     this.albumService.clearCart();
//     this.loadCartItems();
//   }

//   updateQuantity(album: IAlbum, quantity: number): void {
//     if (quantity > 0) {
//       this.albumService.updateCartItemQuantity(album, quantity);
//       this.loadCartItems();
//     }
//   }

//   getCartItemCount(): number {
//     return this.cartItems.length;
//   }

//   getSubtotal(): number {
//     return this.total;
//   }

//   getHST(): number {
//     return parseFloat((this.total * 0.13).toFixed(2));
//   }

//   getTotal(): number {
//     const total = this.total + this.getHST();
//     return parseFloat(total.toFixed(2));
//   }

//   alertMessage(message: string): void {
//     alert(message);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlbum } from '../album-list/album-list.component';
import { CartService } from '../../services/cart-service.service';
import { RouterLink, } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: IAlbum[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  updateQuantity(album: IAlbum, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateCartItemQuantity(album, quantity);
      this.loadCartItems();
    }
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  getSubtotal(): number {
    return this.total;
  }

  getHST(): number {
    return this.cartService.getHST(this.total);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeFromCart(album: IAlbum): void {
    const result = this.cartService.removeFromCart(album);
    if (result.success) {
      this.loadCartItems();
      console.log(`Removed ${album.title} from cart`);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCartItems();
  }
}