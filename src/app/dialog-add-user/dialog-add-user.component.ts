import { Component, OnInit, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent implements OnInit {
  user = new User()
  birthDate!: Date;
  loading = false;

  firestore: Firestore = inject(Firestore)

  constructor() { }

  ngOnInit(): void {
  }

  saveUser() {
    this.user.brithDate = this.birthDate.getTime();
    this.loading = true;

    let userRef = collection(this.firestore, 'users');
    addDoc(userRef, this.user.toJSON()).then((result) => {
      console.log('Adding user done', result);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    })
  }

}
