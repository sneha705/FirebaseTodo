import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator} from '../register/validator/customValidation';
import { HomePage } from '../home/home.page';
import { AlertController,LoadingController,NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm:FormGroup;
  constructor(
    public formBuilder:FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,
    private afAuth :AngularFireAuth,
    public navCtrl: NavController,
    public router:Router
   ) { }
   isLoading:boolean;
   async presentAlert(errmsg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!!!',
      subHeader: errmsg,
      buttons: [{ text: "Ok", role: 'cancel' }]
    });

    await alert.present();
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
  signUp(){
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retype: ['', Validators.compose([Validators.minLength(6), Validators.required,Validators.maxLength(8)])],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }
 
  signUpUser() {
    
    if (this.signupForm.value.password == this.signupForm.value.retype) {
      this.presentLoading();
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
        .then((val) => {
          this.dismiss();
          console.log(val)
          let userId = this.afAuth.auth.currentUser.uid;
          let userDoc = this.firestore.doc<any>('users/' + userId);
          userDoc.set({
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            email: this.signupForm.value.email,
            password:this.signupForm.value.password,
          });
          this.dismiss();
          this.router.navigateByUrl("/login");
        }, (error) => {
          this.dismiss();
          this.presentAlert(error.message);
        });

    } else {
     
      this.presentAlert("The password does not matched")
    }
  }


  ngOnInit() {
    this.signUp()
  }

}
