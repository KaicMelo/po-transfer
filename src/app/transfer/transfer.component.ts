import { Items } from './../interfaces/items.interface';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoDynamicFormField,
  PoGaugeRanges,
  PoListViewAction,
  PoNotificationService,
  PoStepperComponent,
} from '@po-ui/ng-components';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  @ViewChild('stepper') stepper!: PoStepperComponent;

  appDefaultName: string = 'Transferência';

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

  constructor(
    private poNotificationService: PoNotificationService,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.updateLimit();
  }

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

  readonly propertyForm: Array<PoDynamicFormField> = [
    {
      property: 'sender',
      label: 'Remetente',
      gridColumns: 4,
      placeholder: 'Remetente',
      required: true,
    },
    {
      property: 'recipient',
      label: 'Destinatário',
      gridColumns: 4,
      placeholder: 'Destinatário',
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

    this.poNotificationService.success("Transferência salva com sucesso !!")

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

    this.poNotificationService.warning("Cancelamento realizado com sucesso !!")
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  async save() {
    if (this.poGaugeDay >= 100) {
      this.poNotificationService.error('Limite diario atingido');
      return;
    } else if (this.poGaugeAll >= 100) {
      this.poNotificationService.error('Limite total atingido');
      return;
    }

    this.raw = this.dynamicForm.form.getRawValue();

    this.raw = {
      ...this.raw,
      date: new Date().toISOString(),
    };

    this.transferService.setItems(this.raw).subscribe((r) => {
      this.dynamicForm.reset();

      this.propertyData = true;

      this.raw = [this.raw];

      this.stepper.next();

      this.propertyData = false;
    });
  }

  updateLimit() {
    this.transferService.getItems().subscribe((res) => {
      this.poGaugeAll = 10 * res.length;

      let count = 0;

      const today = new Date().toLocaleDateString();

      res.map((m: Items) => {
        let dateToCompare = new Date(m.date).toLocaleDateString();

        if (dateToCompare === today) {
          count++;
        }

        this.poGaugeDay = 25 * count;
      });
    });
  }
}
