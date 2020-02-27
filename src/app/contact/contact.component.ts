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

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.feedBackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: '',
    })
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
