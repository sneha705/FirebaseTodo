import {FormControl} from '@angular/forms'

export class EmailValidator{
    static isValid(control:FormControl){
        const email=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
        if(email){
            return null;
        }return{
            "invalidEmail":true
        }
    }
}
