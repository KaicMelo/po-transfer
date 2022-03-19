import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => alert("Hello World") },
    { label: 'Menu', action: () => alert("Hello World") }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
