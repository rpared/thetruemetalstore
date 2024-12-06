import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlbumComponent } from '../album/album.component';
import { AlbumService } from '../../services/album.service';

export interface IAlbum {
  title: string;
  artist: string;
  genre: string;
  price: number;
  id: number;
  quantity: number;
  imageUrl: string;
}

type qc = {
  id: number;
  data: number;
};

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent implements OnInit {
  title = 'Album List';
  searchValue: string = '';
  album: IAlbum[] = [];
  cart: IAlbum[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.album = this.albumService.getAlbums();
  }

  getTotal(): number {
    return this.albumService.getTotal();
  }
//Methods to be implemented when theres an admin role
  deleteAlbum(id: number) {
    this.album = this.albumService.deleteAlbum(id);
  }

  quantityChange(data: qc) {
    this.album = this.albumService.handleQuantityChange(data.id, data.data);
  }

  addAlbum($event: { title: string; artist: string; genre: string; price: number; quantity: number }) {
    this.album = this.albumService.addAlbum($event);
  }

  searchAlbum(eventData: Event) {
    const searchTerm = (eventData.target as HTMLInputElement).value;
    this.album = this.albumService.searchAlbum(searchTerm);
  }

// Cart methods
  addToCart(album: IAlbum) {
    const result = this.albumService.addToCart(album);
    if (result.success) {
      this.album = this.albumService.getAlbums(); // Refresh albums to update quantities
      this.cart = result.cart;
      // Optionally add a notification
      console.log(`Added ${album.title} to cart`);
    }
  }

  removeFromCart(album: IAlbum) {
    const result = this.albumService.removeFromCart(album);
    if (result.success) {
      this.album = this.albumService.getAlbums(); // Refresh albums to update quantities
      this.cart = result.cart;
      console.log(`Removed ${album.title} from cart`);
    }
  }

  getCartTotal(): number {
    return this.albumService.getCartTotal();
  }

  clearCart() {
    this.albumService.clearCart();
    this.album = this.albumService.getAlbums(); // Refresh albums
    this.cart = this.albumService.getCart();
  }
}