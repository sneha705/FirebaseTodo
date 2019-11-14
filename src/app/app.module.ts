import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { AuthGuard } from '../app/services/auth-guard.service'
import { AuthenticationService } from '../app/services/authentication.service';

export const firebaseConfig = {
  apiKey: "AIzaSyCMzLvG_HGSH2nmvjBQVUHAp0Ngdc6aj98",
  authDomain: "taskapp-6e314.firebaseapp.com",
  databaseURL: "https://taskapp-6e314.firebaseio.com",
  projectId: "taskapp-6e314",
  storageBucket: "taskapp-6e314.appspot.com",
  messagingSenderId: "251147073877",
  appId: "1:251147073877:web:355b1362562440a473d7dc",
  measurementId: "G-3J013H0N88"
};
@NgModule({
  declarations: [AppComponent],
  
  entryComponents: [ ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage','sqlite', 'indexeddb', 'websql']
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
