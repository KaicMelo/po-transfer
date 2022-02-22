import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

import {
  PoDynamicFormField,
  PoListViewAction,
  PoMenuItem,
  PoStepComponent,
  PoStepperComponent,
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  appName: string = 'Hello World';
  buttonDisabled: boolean = true;
  recipient: string = 'recipient';

  dynamicForm!: NgForm;
  raw: any;

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  constructor(private http: HttpClient) {}

  poData() {
    return this.propertyData;
  }

  poAccept() {
    return this.propertyAccept;
  }

  poConcluded() {
    return this.propertyConcluded;
  }

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.hireCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      icon: 'po-icon-ok',
    },
    {
      label: 'Cancelar',
      action: this.cancelCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      type: 'danger',
      icon: 'po-icon-close',
    },
  ];

  hireCandidate(){

  }
  isHiredOrCanceled(){

  }
  cancelCandidate(){

  }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {
      property: 'recipient',
      label: 'Destinatário',
      gridColumns: 4,
      placeholder: 'Destinatário',
      required: true,
    },
    {
      property: 'sender',
      label: 'Remetente',
      gridColumns: 4,
      placeholder: 'Remetente',
      required: true,
    },
    {
      property: 'money',
      label: 'Valor',
      gridColumns: 4,
      placeholder: 'Valor',
      type: 'currency',
      required: true,
    },
    { property: 'description', label: 'Descrição', gridColumns: 12, rows: 5 },
  ];

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  save() {
    this.raw = this.dynamicForm.form.getRawValue();
    this.http.post('http://localhost:3000/items', this.raw).subscribe((r) => {
      this.dynamicForm.reset();

      this.propertyData = true;

      this.stepper.next();

      this.propertyData = false;
    });
  }
  private onClick() {
    alert('Clicked in menu item');
  }
}
