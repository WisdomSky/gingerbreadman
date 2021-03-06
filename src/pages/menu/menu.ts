import { Component } from '@angular/core';
import stories from './../stories/index';
import { NavController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {MusicService} from "../../services/music.service";
import _ from 'lodash';
import {MusicPage} from "../music/music";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  private status = 'main';


  private login_name          = '';
  private new_user_name       = '';
  private new_user_error      = '';
  private stories_list        = {};
  private stories_titles      = [];
  private users_list          = [];
  private users_data          = {};
  private local               = new Storage();
  private delete_user_name    = '';
  private musicService;

  constructor(public navCtrl: NavController, musicService: MusicService, public popoverCtrl: PopoverController) {
    this.musicService = musicService;
    this.stories_list   = stories;
    this.stories_titles = Object.keys(this.stories_list);

    this.local.get('user').then((res) => {
      if (res != null) {
        this.users_list = JSON.parse(res);
      }
    });
    this.local.get('data').then((res) => {
      if (res != null) {
        this.users_data = JSON.parse(res);
      }
    });

  }

  ionViewDidEnter() {
    this.musicService.changeMusic('menu.mp3');
  }

  addNewUser() {

    let name = this.new_user_name.trim();

    if (name.length == 0) {
      this.new_user_error = 'Please enter a name.';
      return;
    }

    if (this.users_list.indexOf(name) != -1) {
      this.new_user_error = 'Name is already used.';
      return;
    }

    this.users_list.push(name);
    this.new_user_name = this.new_user_error = '';
    this.local.set('user', JSON.stringify(this.users_list));
    this.loginUser(name);
  }


  confirmRemoveUser(name) {

    this.delete_user_name = name;
    this.status = 'delete_user_confirm';

  }
  removeUser() {

    let index = this.users_list.indexOf(this.delete_user_name);
    this.users_list.splice(index, 1);
    this.local.set('user', JSON.stringify(this.users_list));
    delete this.users_data[this.delete_user_name];
    this.local.set('data', JSON.stringify(this.users_data));
    this.delete_user_name = '';
    if (!this.users_list.length) {
      this.status = 'main';
      return;
    }
    this.status = 'delete_user';
  }


  loginUser(name) {
    this.login_name = name;
    this.status = 'story_select';
  }


  selectStory(story, suspend_data) {
    this.navCtrl.push(this.stories_list[story], _.extend({}, {login_name: this.login_name}, suspend_data));
  }

  loadSavedStory() {
    var data = this.users_data[this.login_name];
    this.navCtrl.push(this.stories_list[data.story], _.extend({}, {login_name: this.login_name}, data));
  }

  musicSetting() {
    let popover = this.popoverCtrl.create(MusicPage);
    popover.present();
  }

}
