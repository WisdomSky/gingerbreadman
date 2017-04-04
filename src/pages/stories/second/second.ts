import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {MusicPage} from "./../../music/music";
import {MusicService} from "../../../services/music.service";

@Component({
  selector: 'story-second',
  templateUrl: 'second.html'
})
export class SecondStory {

  private musicService;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, musicService: MusicService) {
    this.musicService = musicService;
    musicService.changeMusic('forest.mp3');
  }


  goToMenu() {
    this.navCtrl.popToRoot();

  }

  musicSetting() {
    let popover = this.popoverCtrl.create(MusicPage);
    popover.present();
  }

}
