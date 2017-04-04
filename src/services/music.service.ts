import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {Subject} from "rxjs/subject";

@Injectable()
export class MusicService {

    private bg_music_obs;
    private play_music = true;
    private play_music_obs;

    constructor() {
        this.bg_music_obs  = new Subject();
        this.play_music_obs  = new Subject();
    }


    public onMusicChange(cb) {
        return this.bg_music_obs.subscribe(cb);
    }

    public onMusicPlayableOrNot(cb) {
        return this.play_music_obs.subscribe(cb);
    }

    changeMusic(filename) {
        this.bg_music_obs.next(filename);
    }

    musicPlayable(isPlayable : boolean = undefined) {
        if (isPlayable !== undefined) {
            this.play_music = isPlayable;
            this.play_music_obs.next(this.play_music);
        }
        return this.play_music;
    }



}