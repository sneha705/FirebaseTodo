import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { EmailValidator} from '../register/validator/customValidation';
import { AlertController,LoadingController,NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.page.html',
  styleUrls: ['./reset-pwd.page.scss'],
})
export class ResetPwdPage implements OnInit {
  resetPwdForm:FormGroup
  constructor(
    public formbuilder:FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,
    private afAuth :AngularFireAuth,
    public navCtrl: NavController,
    public router:Router) { }

  async presentAlert(errmsg) {
    const alert = await this.alertCtrl.create({
      header: 'Wait!!!',
      subHeader: errmsg,
      buttons: [{ text: "Ok", role: 'cancel',
       handler: () => {
         this.navCtrl.pop();
       }}]
    });
    await alert.present();
    
  }

  reset(){
    this.resetPwdForm=this.formbuilder.group({
      email:['', Validators.compose([Validators.required,EmailValidator.isValid])],
      })
  }
  resetUserPwd(){
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email)
    .then((user)=>{
      this.presentAlert("we just sent a link to reset your password to your email");
      // this.router.navigateByUrl("/login")
    },(error)=>{
      this.presentAlert(error.message)
    })
 }
  ngOnInit() {
   this.reset();
  }

}
