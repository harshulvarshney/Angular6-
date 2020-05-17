import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'dashboard-router-dialog',
  template: `
  <h2 mat-dialog-title>
    {{dialogTitle}}
  </h2>

  <mat-dialog-content>
      {{dialogMessage}} <br><br>
      Do you want to view status of query run on dashboard ?
  </mat-dialog-content>
  
  <mat-dialog-actions>
      <button mat-raised-button matDialogClose color="primary">Stay on current tab</button>
      <button mat-raised-button matDialogClose color="secondary" type="button" [routerLink]="['dashboard']">Yes</button>
  </mat-dialog-actions>


  `,
  styleUrls: []
})
export class CommonDialog implements OnInit {

  dialogTitle: string;
  dialogMessage: string;

  constructor(private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.dialogTitle = data.dialogTitle;
      this.dialogMessage = data.dialogMessage;

  }

  ngOnInit() {
  }

  close() {
    //this.dialogRef.close();
  }

}