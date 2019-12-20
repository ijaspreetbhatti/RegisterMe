import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z. ]*'),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z. ]*'),
  ]);
  telFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
    Validators.minLength(10),
    Validators.maxLength(11),
  ]);
  addressFormControl = new FormControl('', [
    Validators.required,
  ]);
  dateTimeFormControl = new FormControl('', [
    Validators.required,
    //Validators.pattern("[0-1][0-9]\\/[0-3][0-9]\\/[0-9]{4}, [0-1][0-9]:[0-5][0-9] [paPA][Mm]"),
  ]);

  matcher = new MyErrorStateMatcher();

  isSubmittable = false;

  register(){
    if(!(this.firstNameFormControl.value == "" && this.lastNameFormControl.value == "" &&  this.telFormControl.value == "" 
      && this.emailFormControl.value == "" && this.addressFormControl.value == "" && this.dateTimeFormControl.value == "" )){
        var regs: Object[] = JSON.parse(localStorage.getItem('registrations'));
        regs.push({
          firstname: this.firstNameFormControl.value, lastname: this.lastNameFormControl.value, 
          mobile: this.telFormControl.value, email: this.emailFormControl.value,
          address: this.addressFormControl.value, date: this.dateTimeFormControl.value 
        });
        localStorage.setItem('registrations', JSON.stringify(regs));
        console.log("SAVED");
        this.router.navigate(['/list'])
    }
  }

  constructor(private router: Router) {
    
   }

  ngOnInit() {
  }

}
