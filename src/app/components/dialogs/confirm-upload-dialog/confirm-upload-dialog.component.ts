import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-upload-dialog',
  templateUrl: './confirm-upload-dialog.component.html',
  styleUrls: ['./confirm-upload-dialog.component.css']
})
export class ConfirmUploadDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmUploadDialogComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
