import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlbumComponent } from '../album/album.component';
import { AddAlbumComponent } from '../add-album/add-album.component';

// @NgModule({
//   imports: [
//     // ... other imports
//     FormsModule
//   ],
//   })

export interface IAlbum {
  title: string;
  artist: string;
  genre: string;
  price: number;
  id: number;
  quantity: number;
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
    AlbumComponent,
    // AddAlbumComponent,
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent {
  title = 'Album List';

  searchValue: string = '';

  album: IAlbum[] = [
    {
      title: 'Master of Puppets',
      artist: 'Metallica',
      genre: 'Thrash Metal',
      price: 19.99,
      id: 1,
      quantity: 20,
    },
    {
      title: 'Painkiller',
      artist: 'Judas Priest',
      genre: 'Heavy Metal',
      price: 14.99,
      id: 2,
      quantity: 30,
    },
    {
      title: 'Reign in Blood',
      artist: 'Slayer',
      genre: 'Thrash Metal',
      price: 16.99,
      id: 3,
      quantity: 25,
    },
    {
      title: 'Black Sabbath',
      artist: 'Black Sabbath',
      genre: 'Heavy Metal',
      price: 12.99,
      id: 4,
      quantity: 15,
    },
  ];

  getTotal(): number {
    return this.album.length;
  }

  deleteAlbum(id: number) {
    console.log(id);
    this.album = this.album.filter((album) => album.id !== id);
  }

  quantityChange(data: qc) {
    this.handleQuantityChange(data.id, data.data);
  }
  handleQuantityChange(id: number, data: number) {
    this.album = this.album.map((album) =>
      album.id === id
        ? {
            ...album,
            quantity:
              data > 0
                ? album.quantity + data
                : album.quantity > 0
                ? album.quantity + data
                : 0,
          }
        : album
    );
  }

  addAlbum($event: { id: number; title: string; artist: string; genre: string; price: number; quantity: number }) {
    console.log($event);
    this.album.push({
      title: $event.title,
      quantity: $event.quantity,
      artist: $event.artist,
      genre: $event.genre,
      price: $event.price,
      id: Math.floor(Math.random() * 1000),
    });
  }

  //do the search with one way data binding
  searchAlbum(eventData: Event) {
    console.log((<HTMLInputElement>eventData.target).value);
    this.album = this.album.filter((t) =>
      t.title
        .toLowerCase()
        .includes((<HTMLInputElement>eventData.target).value.toLowerCase()) ||
      t.artist
        .toLowerCase()
        .includes((<HTMLInputElement>eventData.target).value.toLowerCase())
    );
  }
}

