import { environment } from './../environments/environment';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

import { PoDynamicFormField, PoMenuItem, PoListViewAction, PoStepperComponent } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;
  transactionConfirm:any = [];
  
  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  constructor(private http: HttpClient) {}
  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello world') },
  ];

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    }
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
    this.transactionConfirm = [];
    
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString(),
    };
    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true;
      this.transactionConfirm.push(response);
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
    });
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  poData(){
    return this.propertyData;
  }
  
  poAccept(){
    return this.propertyAccept;
  }

  poConcluded(){
    return this.propertyConcluded;
  }

  confirm(){
    this.propertyAccept = true;
    this.stepper.next();
    this.propertyAccept = false;
    this.dynamicForm.reset();
  }

  cancel(){
    this.stepper.first();
  }
}
