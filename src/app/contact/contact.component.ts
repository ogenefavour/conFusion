import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedBackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform', {static: false}) feedbackFormDirective;

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };

  validationMessages = {
    'firstname' : {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters.',
      'maxlength': 'First Name cannot be more than 25 characters.'
    },
    'lastname' : {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters.',
      'maxlength': 'Last Name cannot be more than 25 characters.'
    },
    'telnum' : {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.'
    },
    'email' : {
      'required': 'Email is required.',
      'email': 'email not in valid format.'
    },
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.feedBackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    })

    this.feedBackForm.valueChanges
    .subscribe(data => this.onValueChanged());

    this.onValueChanged; //reset form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedBackForm){ return; }
    const form = this.feedBackForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.feedback = this.feedBackForm.value;
    console.log(this.feedback);
    this.feedBackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '', 
      agree: false,
      contactType: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }
  ngOnInit() {
  }

}
