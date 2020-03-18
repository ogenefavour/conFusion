import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import {Leader} from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import {flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dishErrMess: string
  dish: Dish;
  promotion: Promotion;
  leader: Leader

  constructor(private dishService: DishService, private promotionService: PromotionService,
    private leaderService: LeaderService, @Inject ('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errMess => this.dishErrMess = <any>errMess);
    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errMess => this.dishErrMess = <any>errMess);
    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errMess => this.dishErrMess = <any>errMess);
  }

}
