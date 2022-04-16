import { environment } from './../environments/environment';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

import { PoDynamicFormField, PoMenuItem } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;

  constructor(private http: HttpClient) {}
  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello world') },
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {
      property: 'sender',
      label: 'Remetente',
      placeholder: 'Remetente',
      required: true,
      gridColumns: 4,
    },
    {
      property: 'recipient',
      label: 'Destinatário',
      placeholder: 'Destinatário',
      required: true,
      gridColumns: 4,
    },
    {
      property: 'money',
      label: 'Valor',
      type: 'currency',
      placeholder: 'Valor',
      required: true,
      gridColumns: 4,
    },
    {
      property: 'description',
      label: 'Descrição',
      required: true,
      gridColumns: 12,
      rows: 5,
      placeholder: 'Descrição',
    },
  ];

  save() {
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString(),
    };
    this.http.post(this.API, this.raw).subscribe(() => {
      alert('ok');
    });
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }
}
