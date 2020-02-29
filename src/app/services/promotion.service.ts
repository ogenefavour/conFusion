import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTION } from '../shared/promotions';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTION), 2000);
    });
    //return Promise.resolve(PROMOTION);
  }
  
  getPromotion(id: string) : Promise<Promotion>{
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTION.filter((promo) => (promo.id === id))[0]), 2000);
    });
    //return Promise.resolve(PROMOTION.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion() : Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTION.filter((promo) => (promo.featured))[0]), 2000)
    })
    //return Promise.resolve(PROMOTION.filter((promo) => (promo.featured))[0]);
  }
}
