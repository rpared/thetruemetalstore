// album.service.ts
import { Injectable } from '@angular/core';
import { IAlbum } from '../components/album-list/album-list.component';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albums: IAlbum[] = [
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

  getAlbums(): IAlbum[] {
    return this.albums;
  }

  getTotal(): number {
    return this.albums.length;
  }
}