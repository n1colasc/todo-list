import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
