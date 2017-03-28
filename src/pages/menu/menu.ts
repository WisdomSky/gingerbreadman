import { Component } from '@angular/core';
import stories from './../stories/index';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  private status = 'login';


  private login_username = '';
  private login_password = '';

  private user_has_saved_story = true;

  private stories_list = {};
  private stories_titles = [];

  constructor(public navCtrl: NavController) {
      this.stories_list = stories;
      this.stories_titles = Object.keys(this.stories_list);

  }


  public doLogin()
  {
    this.status = 'menu';
  }

}
