import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, IonApp } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
//import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskList = [];
  taskName: String = "";
  logo="./assets/image/profile.png"
 
  constructor(
    public altctl: AlertController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private app: IonApp,
    public router: Router,
    private storage: Storage,
    private authenService:AuthenticationService) {this.getValue("key") }

    isLoading:boolean;

    removeValue(key:string){
      this.storage.remove(key)
      .then((response)=>{
        console.log("remove value of "+key+" "+response);
      }).catch((error)=>{ 
        console.log("error value of "+key+" "+error);
      })
    }


  
  
    getValue(key:string){
      this.storage.get(key)
      .then((response)=>{
        if(response!=null){
          console.log('get value of' + key + ' ', response);
        this.authenService.setUserAuth(true);
        this.router.navigateByUrl("/home");
        }
        else{
          console.log('get value of' + key + ' ', response);
        this.authenService.setUserAuth(false);
        this.router.navigateByUrl("/login");
        }
        console.log('get value of' + key + ' ', response);
        this.authenService.setUserAuth(true);
        this.router.navigateByUrl("/home");
      }).catch((error)=>{
        console.log('get error for ' + key + ' ', error);
      })
    }

    async presentLoading() {
      this.isLoading = true;
      const loading = await this.loadingCtrl.create({
        message: 'Wait',
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
    async dismiss() {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
  logout() {
    this.presentLoading()
    return this.afAuth.auth.signOut()
      .then(() => {
        this.dismiss()
        this.removeValue("key");
        this.router.navigateByUrl("/login")
        this.authenService.setUserAuth(false);
     
      })
  }
  // async presentLoading(value) {
  //   this.isLoading = value;
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Wait',
  //   });
  //   await loading.present();
  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed!');
  // }
  addTask() {
    if (this.taskName.length > 0) {
      //this.presentLoading(true)
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = "";
    }
  }

  async presentAlert(errmsg,index) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Task',
      subHeader: errmsg,
      buttons: [ {text: "Cancel", role: 'Ok'},
      { text: "Ok", role: 'cancel',
       handler: () => {
        this.taskList.splice(index, 1)
       }}]
    });
    await alert.present();
    
  }

 deleteTask(index) {
  this.presentAlert("Are you sure want to delete task?",index)
    //this.taskList.splice(index, 1)
  }

  async updateTask(index) {
    let alert = await this.altctl.create({
      header: 'Update Task ',
      message: 'Type new task to update',
      inputs: [{ name: 'editTask', placeholder: 'Update Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => {
          this.taskList[index] = data.editTask;
        }
      }]
    });
    await alert.present();
  }
}
