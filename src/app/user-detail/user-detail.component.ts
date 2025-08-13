import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, Firestore, doc, getDoc, docSnapshots } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { User } from '../../models/user.class';
import { DialogAddedAddressComponent } from '../dialog-added-address/dialog-added-address.component';
import { DialogAddedUserComponent } from '../dialog-added-user/dialog-added-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  
  userId = '';
  user: User = new User();

  firestore: Firestore = inject(Firestore);

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe( paramMap => {
        this.userId = paramMap.get('id') || '';
        this.getUser();
      });
  }

  getUser() {
    let docRef = doc(this.firestore, 'users', this.userId);
    from(getDoc(docRef)).subscribe((docSnap: any) => {
      this.user = docSnap.data() as User;
    })
  }

  editMenu() {
    const dialog = this.dialog.open(DialogAddedAddressComponent);
    dialog.componentInstance.user = new User({...this.user});
    dialog.componentInstance.userId = this.userId;
  }

  editUser() {
    const dialog = this.dialog.open(DialogAddedUserComponent);
    dialog.componentInstance.user = new User({...this.user});
    dialog.componentInstance.userId = this.userId;
  }

}
