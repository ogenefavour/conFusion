import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import {switchMap } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input()  
  //dish = Dish;
  errMess: string;
  dish: Dish;
  dishCopy: Dish;
  dishIds: string[];
  dishes: Dish[];
  prev: string;
  next: string;
  
  commentForm: FormGroup;
  commentformVal: Comment;

  @ViewChild('cform', {static: true}) feedbackFormDirective;

  formErrors = {
    'author' : '',
    'comment' : '',
  };

  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters',
      'maxlength': 'Name cannot be more than 25 characters',
    },
    'comment':{
      'required': 'Comment is required'
    }
  }

  onValueChanged(data?: any){
    if(!this.commentForm){ return; }
    const form = this.commentForm;
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

  constructor(private dishService: DishService,
    private route: ActivatedRoute, private fb: FormBuilder,
    private location: Location, @Inject ('BaseURL') private BaseURL) {
      this.createForm();
  }

  onSubmit(){
    this.commentformVal = this.commentForm.value;
    console.log(this.commentformVal);
    var d = new Date();
    var date = d.toISOString();
    this.commentformVal.date = date;
    this.dishCopy.comments.push(this.commentformVal);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish =>{
        this.dish = dish; this.dishCopy = dish;
      }, 
      errmess => {this.dish = null; this.dishCopy = null; this.errMess = <any>errmess;});
    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: '',
    });
    this.feedbackFormDirective.resetForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params["id"])))
      .subscribe(dish => {this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); },
      errMess => this.errMess = <any>errMess);
    // this.dishService.getDishes()
    // .subscribe((dishes) => this.dishes = (dishes))
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: '5',
      comment: ['', Validators.required],
      
    })

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged());

    this.onValueChanged; //reset form validation messages
  }


  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(){
    this.location.back();
  }

}
