import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare var $: any; // Import jQuery globally for use in TypeScript

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Collapse menu on load
    $('#navbarNav').collapse('hide');
  }
}



// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-navigation',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './navigation.component.html',
//   styleUrl: './navigation.component.css'
// })
// export class NavigationComponent {

// }