import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader'
import {LEADERS} from '../shared/leaders'
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }
  getFeaturedLeader(): Leader{
    return LEADERS.filter(leader => leader.featured)[0];
  }
}
