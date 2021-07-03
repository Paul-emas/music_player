<template>
  <div class="player">
    <router-link to="/" class="player__return-btn">
      <b-icon pack="fal" icon="angle-left"> </b-icon>
    </router-link>
    <audio ref="audio" class="player__audio">
      <source
        src="https://cdns-preview-f.dzcdn.net/stream/c-fc32042d7f100c823bf560260e5db7af-6.mp3"
        type="audio/ogg"
      />
      <source
        src="https://cdns-preview-f.dzcdn.net/stream/c-fc32042d7f100c823bf560260e5db7af-6.mp3"
        type="audio/mpeg"
      />
      Your browser does not support the audio element.
    </audio>
    <div class="columns">
      <div class="column">
        <div class="player__image">
          <div
            :class="togglePlay ? '' : 'pause-animation'"
            class="player__image--card"
          >
            <img
              src="https://cdns-images.dzcdn.net/images/cover/900c088fb241de8000b5ed849eba8536/1000x1000-000000-80-0-0.jpg"
              alt="muisc bg image"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="player__container">
          <div class="player__content">
            <h1 class="title is-2">Dont Let me Down</h1>
            <p class="title is-4">🎵 The chainsomkers</p>
            <div class="player__controls">
              <b-icon pack="fal" icon="step-backward"></b-icon>
              <span @click="pause" v-if="togglePlay">
                <b-icon pack="fal" icon="pause-circle"> </b-icon>
              </span>
              <span @click="play" v-else>
                <b-icon pack="fal" icon="play-circle"></b-icon>
              </span>
              <b-icon pack="fal" icon="step-forward"></b-icon>
            </div>
            <div class="player__length">
              <div class="player__length--slider">
                <b-field>
                  <b-slider rounded :tooltip="false"></b-slider>
                </b-field>
              </div>
              <span class="counter">{{ timer }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("music");

@Component({
  components: {},
})
export default class Home extends Vue {
  togglePlay = false;
  @Ref("audio") readonly audio!: HTMLAudioElement;
  timer = 0;

  play() {
    this.togglePlay = true;
    this.audio.play();
    const duration = this.audio.duration;
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    const time = hours + ":" + minutes;
    this.timer = +time.split(".")[0];
  }

  pause() {
    this.togglePlay = false;
    this.audio.pause();
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

    &:hover {
      color: #f74f89;
    }
  }

  & .columns {
    & .column {
      height: 100vh;
    }
  }

  &__image {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &--card {
      max-width: 40rem;
      min-width: 40rem;
      margin: 0 auto;
      height: 40rem;
      overflow: hidden;
      object-fit: cover;
      border-radius: 50%;
      animation-name: spin;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      box-shadow: 0 2px 30px #373a66;

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
      font-family: "Ubuntu";
      color: #fff;
    }

    & p {
      color: #f74f89;
      font-family: "Inter";
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
