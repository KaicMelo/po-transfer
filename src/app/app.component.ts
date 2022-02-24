import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  PoDynamicFormField,
  PoGaugeRanges,
  PoListViewAction,
  PoMenuItem,
  PoStepComponent,
  PoStepperComponent,
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  appName: string = 'Hello World';
  buttonDisabled: boolean = true;
  recipient: string = 'recipient';

  dynamicForm!: NgForm;
  raw: any;

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  isHideLoading: boolean = true;

  poGaugeAll: number = 0;
  poGaugeDay: number = 0;

  constructor(private http: HttpClient) {}

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok',
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close',
    },
  ];

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  readonly propertyForm: Array<PoDynamicFormField> = [
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

  readonly turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Baixo', color: '#00b28e' },
    { from: 50, to: 75, label: 'Médio', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Alto', color: '#c64840' },
  ];

  ngOnInit(): void {
    this.updateLimit();
  }

  poData() {
    return this.propertyData;
  }

  poAccept() {
    return this.propertyAccept;
  }

  poConcluded() {
    return this.propertyConcluded;
  }

  confirm() {
    this.updateLimit();

    this.propertyAccept = true;

    this.isHideLoading = false;

    setTimeout(() => {
      this.isHideLoading = true;

      this.stepper.next();

      this.propertyAccept = false;

      this.raw = [];
    }, 2000);

    setTimeout(() => {
      this.stepper.first();
    }, 4000);
  }

  cancel() {
    this.stepper.first();
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  async save() {
    this.raw = this.dynamicForm.form.getRawValue();

    this.raw = {
      ...this.raw,
      date: new Date().toISOString(),
    };

    this.http.post('http://localhost:3000/items', this.raw).subscribe((r) => {
      this.dynamicForm.reset();

      this.propertyData = true;

      this.raw = [this.raw];

      this.stepper.next();

      this.propertyData = false;
    });
  }

  private onClick() {
    alert('Clicked in menu item');
  }

  updateLimit() {
    this.http.get<[]>('http://localhost:3000/items').subscribe((res) => {
      this.poGaugeAll =  10 * res.length

      let count = 0;

      const today = new Date().toLocaleDateString();

      res.map((m: items) => {
        let dateToCompare = new Date(m.date).toLocaleDateString();

        if(dateToCompare === today){
          count++
        }

        this.poGaugeDay = 25 * count;

      });

    });
  }
}

export interface items {
  recipient: String,
  sender: string,
  money: number,
  description: string,
  date: Date,
  id: number
}
