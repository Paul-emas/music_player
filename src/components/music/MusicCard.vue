<template>
  <div class="music-card">
    <div v-if="loading">
      <div class="music-card__image">
        <b-skeleton width="100%" height="210px" :animated="true"></b-skeleton>
      </div>
      <div class="music-card__caption">
        <b-skeleton width="30%" :animated="true"></b-skeleton>
        <b-skeleton width="80%" :animated="true"></b-skeleton>
      </div>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Player' }">
        <div class="music-card__image" @click="getSelectedTrack(id)">
          <figure>
            <div class="overlay">
              <img src="../../assets/logo.png" alt="logo" class="bg" />
            </div>
            <img :src="imageUrl" alt="music-image-placeholder" />
          </figure>
        </div>
        <div class="music-card__caption">
          <h1>
            {{ title.length > 20 ? `${title.substring(0, 20)}....` : title }}
          </h1>
          <p>
            <b-icon pack="fal" icon="music"></b-icon>
            {{ artist.length > 20 ? `${artist.substring(0, 20)}..` : artist }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from 'vue-property-decorator';

@Component
export default class MusicCard extends Vue {
  @Prop({
    default:
      'https://cdn.dribbble.com/users/3547568/screenshots/14395014/media/0b94c75b97182946d495f34c16eab987.jpg?compress=1&resize=400x300',
  })
  imageUrl!: string;
  @Prop(String) title!: string;
  @Prop(Number) id!: number;
  @Prop(String) artist!: string;
  @Prop(Boolean) loading!: boolean;

  @Emit('getSelectedTrack')
  getSelectedTrack(id: any) {
    return id;
  }
}
</script>

<style lang="scss" scoped>
.music-card {
  min-height: 15rem;
  max-height: 20rem;
  overflow: hidden;
  margin-right: 1rem;
  position: relative;

  // @media screen and (max-width: 768px) {
  //   min-height: 10rem;
  //   max-height: 10rem;
  // }

  &:hover {
    & img {
      transform: scale(1.2) rotate(6deg);
    }

    & .overlay {
      opacity: 1;

      & img {
        transform: scale(1);
      }
    }
  }

  &__image {
    width: 100%;

    & figure {
      width: 100%;
      height: 225px;
      overflow: hidden;
      border-radius: 0.5rem;
      position: relative;

      @media screen and (max-width: 768px) {
        height: 200px;
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        transition: all 0.3s ease;
        transform: scale(1.05);
      }
    }
  }

  & .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s ease;

    &:active {
      & img {
        transform: scale(0.9);
      }
    }

    & img {
      width: 6rem;
      height: 6rem;
      transition: 0.2s ease;
      transform: scale(0.2);
    }
  }

  &__caption {
    margin-top: 1rem;

    h1 {
      font-weight: 600;
    }

    & h1,
    p {
      color: #dbdbdb;
      font-size: 0.9rem;
      font-family: 'Inter', sans-serif;
    }
  }
}
</style>
