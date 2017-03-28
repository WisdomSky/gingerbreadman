import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  private status = 'login';


  private login_username = '';
  private login_password = '';


  constructor(public navCtrl: NavController) {
    
  }


  public doLogin()
  {
    console.log(this.login_username);
    console.log(this.login_password);
  }

}
