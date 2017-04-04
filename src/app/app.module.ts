import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { FirstStory } from '../pages/stories/first/first';
import { SecondStory } from '../pages/stories/second/second';
import { MusicPage } from '../pages/music/music';
import { MusicService } from '../services/music.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    FirstStory,
    SecondStory,
    MusicPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    FirstStory,
    SecondStory,
    MusicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MusicService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
