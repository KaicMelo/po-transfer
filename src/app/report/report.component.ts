import { Items } from './../interfaces/items.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  appDefaultName:string = 'Relatório';
  items!: Items[];

  columns: Array<PoTableColumn> = [
    {property:'sender', label:"Remetente"},
    {property:'recipient', label:"Destinatário"},
    {property:'money', label:"Valor", type:"currency", format:'BRL'},
    {property:'description', label:"Descrição"},
    {property:'date', label:"Data", type:'date', format:"dd/MM/YYYY HH:mm"}
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Array<Items>>('http://localhost:3000/items').subscribe( res => {
      this.items = res;
    })
  }

}
