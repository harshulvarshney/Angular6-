import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

import { CommonDialog } from '../dialogs/dashboard-router-dialog';
import { CommonConstants } from '../model/common';
import { IResults } from '../model/results';
import { Results } from '../model/results-download';
import { ResultsService } from '../services/results.service';


@Component({
  selector: 'app-my-data-table',
  templateUrl: './my-data-table.component.html',
  styleUrls: ['./my-data-table.component.css']
})
export class MyDataTableComponent implements OnInit {

  displayedColumns = ['id', 'name', 'dept', 'doj', 'city'];
  
  dataSource = new MatTableDataSource<IResults>();
  selection = new SelectionModel<IResults>(false, []);
  resultsLength = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 50];
  isLoadingResults = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formGroup: FormGroup;
  isdIndexMap: Map<string, string>;

  constructor(
    private formBuilder: FormBuilder,
    private resultsService: ResultsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.createForm();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeFilters();
    this.dataSource.filterPredicate = this.createFilter();
    this.loadDataTable();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.pattern("^[0-9]*$")]],
      name: ''
    });
  }

  onSubmit() {
    console.log('form submitted');
    if (this.formGroup.invalid) {
      console.log('Form invalid');
      return;
    }

    this.isLoadingResults = true;
    this.loadDataTable(+this.formGroup.controls.id.value);

  }

  clearFilters() {
    this.formGroup.reset();
    this.dataSource.data = [];
    this.paginator.firstPage();
    this.resetColumnFilters();
  }

  loadDataTable(id?: number) {
    this.resultsService.getResults(id)
    .subscribe(
      data => {
        this.isLoadingResults = false;
        this.resetColumnFilters();
        this.dataSource.data = data;
        this.resultsLength = data.length;
        this.pageSizeOptions.push(this.dataSource.data.length);
        this.paginator.firstPage();
      },
      err => {
        this.isLoadingResults = false;
        this.resetColumnFilters();
        this.dataSource.data = [];
        this.openModel('Error', err.error);
      }
    );
  }

  openModel(title: string, msg: string) {
    const dialogConfig = CommonConstants.getmatDialogConfig();

    dialogConfig.data = {
      id: null,
      dialogTitle: title,
      dialogMessage: msg,
      showSaveButton: false,
      closeButtonTitle: 'OK'
    }

    const dialogRef = this.dialog.open(CommonDialog, dialogConfig);
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.paginator.length > 15)
      return [10, 15,  this.dataSource.paginator.length];
    else
      return [10, 15];
  }
  
  exportToCsv() {
    if(this.formGroup.invalid)
      return;
    
    let csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ['Employee ID', 'Employee Name', 'Department', 'DOJ', 'City']
    };
    let resultsData: IResults[] = Array.from(this.dataSource.data);
    let data = resultsData.map(i => new Results(i))

    new AngularCsv(data, 'Employee-Data', csvOptions);
  }


  ///////////////////////////////////// Table filters //////////////////////////////////////////
  idFilter = new FormControl('');
  nameFilter = new FormControl('');
  deptFilter = new FormControl('');
  dojFilter = new FormControl('');
  cityFilter = new FormControl('');

  resetColumnFilters() {
    this.idFilter.patchValue('');
    this.nameFilter.patchValue('');
    this.deptFilter.patchValue('');
    this.dojFilter.patchValue('');
    this.cityFilter.patchValue('');
  }

  searchColumns = ['_id', '_name', '_dept', '_doj', '_city'];

  filterValues: IResults = {
    id: 0,
    name: '',
    department: '',
    doj: '',
    city: ''
  };

  initializeFilters() {
    this.idFilter.valueChanges
      .subscribe(
        data => {
          this.filterValues.id = data.toString().trim();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.nameFilter.valueChanges
      .subscribe(
        data => {
          this.filterValues.name = data.toString().trim();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.deptFilter.valueChanges
      .subscribe(
        data => {
          this.filterValues.department = data.toString().trim();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.dojFilter.valueChanges
      .subscribe(
        data => {
          this.filterValues.doj = data.toString().trim();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.cityFilter.valueChanges
      .subscribe(
        data => {
          this.filterValues.city = data.toString().trim();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let match =  true;
      if(data.id) {
        match = data.id.toString().toLowerCase().indexOf(searchTerms.id.toLowerCase()) !== -1;
        if(!match)
          return match;
      }
      if(data.name) {
        match = data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1;
        if(!match)
          return match;
      }
      if(data.department) {
        match = data.department.toLowerCase().indexOf(searchTerms.department.toLowerCase()) !== -1;
        if(!match)
          return match;
      }
      if(data.doj) {
        match = data.doj.toLowerCase().indexOf(searchTerms.doj.toLowerCase()) !== -1;
        if(!match)
          return match;
      }
      if(data.city) {
        match = data.city.toLowerCase().indexOf(searchTerms.city.toLowerCase()) !== -1;
        if(!match)
          return match;
      }
      return match;
    }
    return filterFunction;
  }

}
