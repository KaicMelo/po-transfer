import { Component } from '@angular/core';

import { PoDynamicFormField, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello world') }
  ];

  propertyForm: Array<PoDynamicFormField> = [
    { property: 'sender', label: 'Remetente', placeholder: 'Remetente', required: true },
    { property: 'recipient', label: 'Destinatário', placeholder: 'Destinatário', required: true },
    { property: 'money', label: 'Valor', type: 'currency', placeholder: 'Valor', required: true },
    { property: 'description', label: 'Descrição', required: true },
  ]

}
