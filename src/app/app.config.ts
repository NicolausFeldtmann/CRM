import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-ea576","appId":"1:503209313720:web:bf7eabcf741fbd61c73b4d","storageBucket":"simple-crm-ea576.firebasestorage.app","apiKey":"AIzaSyDt7GMpw2qGmclRj33RrXBxbupSzUHPlFo","authDomain":"simple-crm-ea576.firebaseapp.com","messagingSenderId":"503209313720"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
