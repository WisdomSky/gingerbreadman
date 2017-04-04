import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import {MusicService} from "../services/music.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MenuPage;

  private musicService;

  @ViewChild('audio') audio;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, musicService: MusicService) {
    this.musicService = musicService;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.hide();
      splashScreen.hide();

    });
  }


  ngOnInit() {


    this.musicService.onMusicChange((filename) => {
      this.audio.nativeElement.src = `assets/music/${filename}`;

      if (this.musicService.musicPlayable()) {
        this.audio.nativeElement.play();
      } else {
        this.audio.nativeElement.pause();
      }
    });

    this.musicService.onMusicPlayableOrNot((isPlayable) => {

      if (isPlayable) {
        this.audio.nativeElement.play();
      } else {
        this.audio.nativeElement.pause();
      }

    });

  }

}
