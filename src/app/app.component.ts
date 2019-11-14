import { Component } from '@angular/core';
import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from './home/home.page';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any;
  userId:any;
  fireStoreTaskList:any;
  fireStoreList:any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth :AngularFireAuth,
    public firestore: AngularFirestore,
    private storage: Storage
  ) {
    
    this.initializeApp();
    const authObserver = this.afAuth.authState.subscribe( user => {
      if (user) {
        //alert("function called")
        this.userId = user.uid;

        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges();
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
       // console.log(this.fireStoreList1)
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });

   
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
