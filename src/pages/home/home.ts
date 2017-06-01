import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceMotion } from '@ionic-native/device-motion';

import { Subscription } from 'rxjs';

const GRAVITY_EARTH = 9.80665;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public subscription: Subscription;

  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(public deviceMotion: DeviceMotion, public navCtrl: NavController) {

  }

  public getGForce(value: number): string {
    let gForce = (value / GRAVITY_EARTH);
    return gForce.toFixed(2);
  }

  public getPercent(value: number): string {
    let percent = ((value / GRAVITY_EARTH) * 50) + 50;
    return percent + '%';
  }

  public ionViewDidEnter() {
    this.subscription = this.deviceMotion.watchAcceleration({
      frequency: 100,
    }).subscribe(acceleration => {
      this.x = acceleration.x;
      this.y = acceleration.y;
      this.z = acceleration.z;
    }, error => console.error(error));
  }

  public ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
