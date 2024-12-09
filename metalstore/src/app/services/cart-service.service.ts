import { Injectable } from '@angular/core';
import { IAlbum } from '../components/album-list/album-list.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: IAlbum[] = [];

  constructor() {}

  getCartItems(): IAlbum[] {
    return this.cartItems;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getHST(total: number): number {
    return parseFloat((total * 0.13).toFixed(2));
  }

  getTotal(): number {
    const total = this.getCartTotal();
    const hst = this.getHST(total);
    return parseFloat((total + hst).toFixed(2));
  }

  addToCart(album: IAlbum): void {
    const existingItem = this.cartItems.find(item => item.id === album.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...album, quantity: 1 });
    }
  }

  updateCartItemQuantity(album: IAlbum, quantity: number): void {
    const item = this.cartItems.find(i => i.id === album.id);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeFromCart(album: IAlbum): { success: boolean } {
    const index = this.cartItems.findIndex(i => i.id === album.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  }

  clearCart(): void {
    this.cartItems = [];
  }
}