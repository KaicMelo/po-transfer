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
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  appName: string = 'Curso de POUI';

  constructor(private router: Router) {}

  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Transfêrencia',
      action: () => {
        this.router.navigate(['']);
      },
      icon: 'po-icon po-icon-money',
      shortLabel: 'Trasferencia',
    },
    {
      label: 'Relatório',
      action: () => {
        this.router.navigate(['report']);
      },
      icon: 'po-icon po-icon-folder',
      shortLabel: 'Relatório',
    },
  ];
}
