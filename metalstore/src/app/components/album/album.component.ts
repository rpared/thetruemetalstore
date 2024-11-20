import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-album',
  standalone: true,
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {
  @Input() aList!: IAlbum;

  //Raise the event to send the data back to parent
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() quantityChange: EventEmitter<qc> = new EventEmitter<qc>();

  onDelete(id: number) {
    this.delete.emit(id);
  }
  onQuantityChange(id: number, data: number) {
    this.quantityChange.emit({ id, data });
  }
}
