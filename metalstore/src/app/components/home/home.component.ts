import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlbumListComponent } from '../album-list/album-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
