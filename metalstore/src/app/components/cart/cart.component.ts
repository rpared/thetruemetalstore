import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { IAlbum } from '../album-list/album-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: IAlbum[] = [];
  total: number = 0;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    // Initialize cart items when component loads
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.albumService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(album: IAlbum): void {
    const result = this.albumService.removeFromCart(album);
    if (result.success) {
      this.loadCartItems();
      console.log(`Removed ${album.title} from cart`);
    }
  }

  clearCart(): void {
    this.albumService.clearCart();
    this.loadCartItems();
  }

  updateQuantity(album: IAlbum, quantity: number): void {
    if (quantity > 0) {
      this.albumService.updateCartItemQuantity(album, quantity);
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
    return parseFloat((this.total * 0.13).toFixed(2));
  }

  getTotal(): number {
    return parseFloat(this.total + this.getHST().toFixed(1));
  }
}