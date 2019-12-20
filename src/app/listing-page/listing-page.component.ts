import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import * as moment from 'moment'

export interface Registration {
  firstname: string;
  lastname: string;
  mobile: number;
  email: string;
  date: string;
  address: string;
}

var Registrations: Registration[];
/*  [
  { firstname: 'Jaspreet', lastname: 'Bhatti', mobile: 8156938196, email: "altairximate@gmail.com", date: "12/12/2019, 10:10 AM", address: "2023 Sector 70 Mohali" }
]; */

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})

export class ListingPageComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'mobile', 'email', 'date', 'address',];
  dataSource;
  dataSourceBK;

  toFormControl = new FormControl('', [
    Validators.required
  ]);
  fromFormControl = new FormControl('', [
    Validators.required
  ]);
  

  applyFilter() {
    if(!(this.fromFormControl.value == '' && this.toFormControl.value == '')){
    let filterValue = this.fromFormControl.value;
    this.dataSource.filter = filterValue; 
    }
  }

  constructor() {
    console.log(JSON.parse(localStorage.getItem('registrations')));
    Registrations = JSON.parse(localStorage.getItem('registrations'));
    this.dataSource = new MatTableDataSource(Registrations);
    this.dataSourceBK = new MatTableDataSource(Registrations);
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Registration, filter: string) => new Date(data.date) >= new Date(this.fromFormControl.value) && new Date(data.date) <= new Date(this.toFormControl.value);
  }

  clear() {
    this.fromFormControl.setValue('');
    this.toFormControl.setValue('');
    this.dataSource = this.dataSourceBK;
  }

}
