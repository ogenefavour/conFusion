import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTION } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTION).pipe(delay(2000));
  }
  
  getPromotion(id: string) : Observable<Promotion>{
    //return of(PROMOTION.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturedPromotion() : Observable<Promotion> {
    //return of(PROMOTION.filter((promo) => (promo.featured))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));

  }
}
