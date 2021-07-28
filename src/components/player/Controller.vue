<template>
  <div @keyup.space="!isPlaying" class="player">
    <router-link to="/" class="player__return-btn">
      <b-icon pack="fal" icon="angle-left"></b-icon>
    </router-link>
    <audio :onended="next" ref="audio" class="player__audio">
      <source :src="mp3Url" type="audio/ogg" />
      <source :src="mp3Url" type="audio/mpeg" />
    </audio>
    <div class="columns">
      <div class="column">
        <PlayerDisc :url="song.album ? song.album.cover_xl : ''" :togglePlay="isPlaying" />
      </div>
      <div class="column">
        <div class="player__container">
          <div class="player__content">
            <h1 class="title is-2">
              {{ song.title ? song.title : 'No Song Available' }}
            </h1>
            <p class="title is-4">
              <b-icon pack="fal" icon="music"></b-icon>
              {{ song.artist ? song.artist.name : 'No Song Selected' }}
            </p>
            <div class="player__controls">
              <span @click="prev">
                <b-icon pack="fal" icon="step-backward"></b-icon>
              </span>
              <span @click="pause" v-if="isPlaying">
                <b-icon pack="fal" icon="pause-circle"> </b-icon>
              </span>
              <span @click="play" v-else>
                <b-icon pack="fal" icon="play-circle"></b-icon>
              </span>
              <span @click="next">
                <b-icon pack="fal" icon="step-forward"></b-icon>
              </span>
            </div>
            <PlayerSlider :timer="timer" :length="musicLength" :duration="musicDuration" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Watch, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import PlayerSlider from './controls/PlayerSlider.vue';
import PlayerDisc from './controls/PlayerDisc.vue';

@Component({
  components: {
    PlayerSlider,
    PlayerDisc,
  },
  computed: {
    ...mapGetters({
      tracks: 'music/selectedPlaylist',
      music: 'music/selectedTrack',
    }),
  },
})
export default class Player extends Vue {
  isPlaying = false;
  timer = '';
  musicLength: string | number = 0;
  musicDuration = 0;
  selectedSong: any = {};
  song = {};
  mp3Url = '';
  musics: Array<any> = [];
  loop: any = null;
  audio = new Audio();

  mounted() {
    this.play();
  }

  destroyed() {
    this.stop();
  }

  @Watch('music', { immediate: true })
  onChangeTrack(val: any) {
    const { title, artist, album, preview } = val;
    this.selectedSong = val;
    this.song = {
      title,
      artist,
      album,
    };
    this.mp3Url = preview;
  }

  @Watch('tracks', { immediate: true })
  onChangePlaylist(val: Array<any>) {
    this.musics = val;
  }

  @Watch('mp3Url', { immediate: true })
  onChangeMp3(val: string) {
    this.audio.src = val;
    this.play();
  }

  updateProgressValue(): any {
    const duration = this.audio.duration;
    const counter = this.audio.currentTime;
    this.musicDuration = duration;
    this.musicLength = counter;
    if (duration === counter) {
      this.next();
    }
    this.timer = this.formatTime(Math.floor(counter));
    if (this.timer === 'NaN:NaN') {
      this.timer = '0:00';
    } else {
      this.timer = this.formatTime(Math.floor(counter));
    }
  }

  formatTime(seconds: number) {
    let min = Math.floor(seconds / 60);
    let sec: number | string = Math.floor(seconds - min * 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  }

  startTimer() {
    if (this.isPlaying) {
      this.loop = setInterval(() => {
        this.updateProgressValue();
      }, 500);
    } else {
      clearInterval(this.loop);
    }
  }

  play() {
    if (this.musics.length > 0) {
      this.isPlaying = true;
      this.audio.play();
      this.startTimer();
    }
  }

  pause() {
    this.isPlaying = false;
    this.audio.pause();
    clearInterval(this.loop);
  }

  get trackIndex(): number {
    return this.musics.indexOf(this.selectedSong);
  }

  stop() {
    this.pause();
    this.audio.currentTime = 0;
  }

  next() {
    this.stop();
    if (this.trackIndex >= 0) {
      const nextSong = this.musics[this.trackIndex + 1];
      this.selectedSong = nextSong;
      const { title, artist, album, preview } = nextSong;
      this.song = {
        title,
        artist,
        album,
      };
      this.mp3Url = preview;
    }
  }

  prev() {
    this.stop();
    if (this.trackIndex >= 1) {
      const prevSong = this.musics[this.trackIndex - 1];
      this.selectedSong = prevSong;
      const { title, artist, album, preview } = prevSong;
      this.song = {
        title,
        artist,
        album,
      };
      this.mp3Url = preview;
    }
  }
}
</script>

<style lang="scss">
.pause-animation {
  animation-play-state: paused;
}

.player {
  position: relative;

  &__audio {
    visibility: hidden;
  }

  &__return-btn {
    position: absolute;
    top: 1rem;
    font-size: 4rem;
    color: #fff;
    z-index: 20;

    &:hover {
      color: #f74f89;
    }
  }

  & .columns {
    flex-wrap: wrap;
    & .column {
      height: 100vh;

      @media screen and (max-width: 768px) {
        height: auto;
      }
    }
  }

  &__image {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &--card {
      width: 90%;
      margin: 0 auto;
      height: 100%;
      overflow: hidden;
      object-fit: cover;
      border-radius: 50%;
      margin-top: -2rem;
      animation-name: spin;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      transition: all 0.4s;
      box-shadow: 0 2px 30px #373a66;

      @media screen and (max-width: 1200px) {
        width: 90%;
        height: 90%;
        margin-top: 14rem;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      & img {
        width: 100%;
        height: 100%;
        padding: 1rem;
        border-radius: 50%;
        border: 3px solid #fa8072;
        background: linear-gradient(to right, #f74f89, #6287bb);
      }
    }
  }

  .b-slider .b-slider-track {
    background-color: #1453b180;
    height: 4px;
  }

  .b-slider.is-rounded .b-slider-thumb {
    background-color: #f74f89;
    border: none;
  }

  .b-slider.is-primary .b-slider-fill {
    background-color: #f74f89 !important;
  }

  &__length {
    display: flex;
    width: 30rem;
    margin: 2rem auto;

    &--slider {
      width: 85%;
    }

    & .counter {
      margin-left: 1rem;
      margin-top: 0.25rem;
      font-size: 1.2rem;
      color: #f74f89;
      font-weight: 600;
    }
  }

  &__content {
    text-align: center;
  }

  &__container {
    position: relative;
    max-width: 80%;
    height: 30rem;
    left: 50%;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);

    & h1 {
      font-family: 'Ubuntu';
      color: #fff;
    }

    & p {
      color: #f74f89;
      font-family: 'Inter';
    }
  }

  &__controls {
    width: 12rem;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 4rem;

    & .fa-play-circle,
    .fa-pause-circle {
      font-size: 3.5rem;
      color: #f74f89;
    }

    & i {
      font-size: 2rem;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
