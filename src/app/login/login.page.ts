import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { EmailValidator} from '../register/validator/customValidation';
import { AlertController,LoadingController,NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup
  isLoading = false;
  constructor(
    public formbuilder:FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,
    private afAuth :AngularFireAuth,
    public navCtrl: NavController,
    public router:Router,
    private storage: Storage,
    private authenService:AuthenticationService) {}

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
    async presentAlert(errmsg) {
      const alert = await this.alertCtrl.create({
        header: 'Error!!!',
        subHeader: errmsg,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
  
      await alert.present();
    }


  login(){
    this.loginForm=this.formbuilder.group({
    email:['', Validators.compose([Validators.required,EmailValidator.isValid])],
    password:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    })
  }

  setValue(key:string,value:any){
    this.storage.set(key,value)
    .then((response)=>{
      console.log('set value of' + key + ' ', response);
      this.getValue(key);
    }).catch((error)=>{
      console.log('set error for ' + key + ' ', error);
    });
  }

  getValue(key:string){
    this.storage.get(key)
    .then((response)=>{
      console.log('get value of' + key + ' ', response);
      this.authenService.setUserAuth(true);
      this.router.navigateByUrl("/home");
    }).catch((error)=>{
      console.log('get error for ' + key + ' ', error);
    })
  }

  loginUser(){
    // if(this.loginForm.value==null){
    //   this.presentAlert("please fill data")
    // }
    this.presentLoading()
   this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password) 
    .then((response)=>{
      this.dismiss();
      //console.log(response);
      this.setValue("key",this.loginForm.value.email);
      this.loginForm.reset();
    },(error)=>{
      this.dismiss();
      this.presentAlert(error.message)
    });
  }

  resetPwd(){
    this.router.navigateByUrl('/reset-pwd')
  }
  createAccount(){
    this.router.navigateByUrl('/register');
  }
  ngOnInit() {
    this.login();
  }

}
