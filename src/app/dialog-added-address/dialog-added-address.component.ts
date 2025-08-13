import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-added-address',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './dialog-added-address.component.html',
  styleUrl: './dialog-added-address.component.scss'
})
export class DialogAddedAddressComponent implements OnInit {
  @Output() userAdded = new EventEmitter<void>();
  user!: User
  userId!: string;
  birthDate!: Date;
  loading = false;

  firestore: Firestore = inject(Firestore)
  dialog: any;

  constructor(public dialogRef: MatDialogRef<DialogAddedAddressComponent>) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    const userDocRef = doc(this.firestore, 'users', this.userId);
    updateDoc(userDocRef, this.user.toJSON());
    this.userAdded.emit();
    setTimeout(() => {
      this.loading = false;
      this.closeDialog();
    }, 2000);
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
