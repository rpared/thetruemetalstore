import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HeaderComponent,
    RouterOutlet,
    AlbumListComponent,
    FooterComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'The True Metal Store';
}
