import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import {MusicService} from "../../services/music.service";

@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {

  private musics_list = {
    'Desert': 'desert.mp3',
    'Forest': 'forest.mp3',
    'Forest 2': 'forest2.mp3',
    'Game': 'game.mp3',
    'Snow': 'snow.mp3'
  };

  private music_titles = [];
  private local = new Storage();
  private musicService;
  public play_music = true;

  constructor(public navCtrl: NavController, musicService: MusicService) {
    this.music_titles = Object.keys(this.musics_list);
    this.musicService = musicService;
    this.play_music = this.musicService.musicPlayable();
  }


  updateSettings(e) {
    this.play_music = e.checked;
    this.musicService.musicPlayable(e.checked);
  }

  changeMusic(name) {
    this.musicService.changeMusic(this.musics_list[name]);
  }

}
