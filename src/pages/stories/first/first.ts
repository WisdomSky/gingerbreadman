import {Component, ViewChild } from "@angular/core";
import {NavController, NavParams, PopoverController, Slides } from "ionic-angular";
import {MusicPage} from "./../../music/music";
import {MusicService} from "../../../services/music.service";
import { Storage } from '@ionic/storage';
import {MenuPage} from "../../menu/menu";


@Component({
  selector: 'story-first',
  templateUrl: 'first.html'
})
export class FirstStory {



  private local               = new Storage();
  private login_name = 'wew';
  private musicService;
  private load_slide = 0;
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, private navParams: NavParams, public popoverCtrl: PopoverController, musicService: MusicService) {
    this.musicService = musicService;
    musicService.changeMusic('forest.mp3');
    this.login_name = navParams.get('login_name');

    if (parseInt(navParams.get('slide')) > 0) {
      this.load_slide = parseInt(navParams.get('slide'))
    }
  }


  ngOnInit() {
    this.slides.initialSlide = this.load_slide;
  }

  onSlideChange() {

    this.local.get('data').then((res) => {
      let data;
      if (res != null) {
        data = JSON.parse(res);
      } else {
        data = {};
      }

      data[this.login_name] = {
        story: 'The Adventure of Little Gingerbread Man and the Butterfly',
        slide: this.slides.getActiveIndex()
      };

      this.local.set('data', JSON.stringify(data));

    });

  }

  goToMenu() {
    this.navCtrl.setPages([{page: MenuPage}]);
  }

  musicSetting() {
    let popover = this.popoverCtrl.create(MusicPage);
    popover.present();
  }

}
