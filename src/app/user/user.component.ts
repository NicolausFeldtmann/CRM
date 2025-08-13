import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData  } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  
  user = new User();
  allUsers: any[] = [];

  firestore: Firestore = inject(Firestore)
  recivedUsers: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    let userRef = collection(this.firestore, 'users');
    collectionData(userRef, {idField: 'costomIdName'}).subscribe((changes: any) => {
      this.allUsers = changes;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    })
  }

  loadUsers() {
    const userRef = collection(this.firestore, 'users');
    collectionData(userRef, {idField: 'costomIdName'}).subscribe((changes: any) => {
      this.allUsers = changes;
    })
  }
}
