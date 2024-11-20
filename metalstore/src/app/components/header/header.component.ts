import { Component, Input } from '@angular/core';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  @Input() total: number;

  constructor(private albumService: AlbumService) {
    this.total = this.albumService.getTotal();
  }
  // @Input() title = '';
}
