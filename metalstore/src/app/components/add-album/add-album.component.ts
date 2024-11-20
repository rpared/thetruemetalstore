import { Component, Output, EventEmitter, inject } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

type AlbumType = {
  title: string;
  artist: string;
  genre: string;
  price: number;
  id: number;
  quantity: number;
};

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-album.component.html',
  styleUrl: './add-album.component.css'
})

export class AddAlbumComponent {
  @Output() addAlbum: EventEmitter<AlbumType> =
  new EventEmitter<AlbumType>();

onSubmit(form: NgForm) {
  console.log(form);
  let id = Math.floor(Math.random() * 1000);
  let title = form.value.title;
  let quantity = form.value.quantity;
  let artist = form.value.artist;
  let genre = form.value.genre;
  let price = form.value.price;
  this.addAlbum.emit({ id, title, quantity, artist, genre, price });
}

albumForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  quantity: new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]{1,5}$'),
  ]),
  artist: new FormControl('', [Validators.required, Validators.minLength(3)]),
  genre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  price: new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]{1,5}$'),
  ]),
});
onSubmit2() {
  this.addAlbum.emit({
    id: Math.floor(Math.random() * 1000),
    title: this.albumForm.value.title!,
    quantity: this.albumForm.value.quantity!,
    artist: this.albumForm.value.artist!,
    genre: this.albumForm.value.genre!,
    price: this.albumForm.value.price ?? 0
  });
}
}
