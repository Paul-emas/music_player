<template>
  <div class="app__treading">
    <heading>
      <b-skeleton
        :active="isLoading"
        width="30%"
        height="50px"
        :animated="true"
      ></b-skeleton>
      <slot v-if="!isLoading"></slot>
    </heading>
    <b-carousel-list v-if="isLoading" :data="items" :items-to-show="6">
      <template slot="item">
        <music-card :loading="true" />
      </template>
    </b-carousel-list>
    <b-carousel-list v-else :data="music.tracks" :items-to-show="6">
      <template slot="item" slot-scope="track">
        <music-card
          :title="track.title"
          :imageUrl="track.album.cover_medium"
          :id="track.artist.id"
          :artist="track.artist.name"
          @getSelectedTrack="getSelectedTrack"
        />
      </template>
    </b-carousel-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("music");

// Components imports
import Heading from "@/components/layouts/Heading.vue";
import MusicCard from "@/components/music/MusicCard.vue";

@Component({
  components: {
    Heading,
    MusicCard,
  },
  methods: {
    ...mapMutations({
      setSelectedPlaylist: "setSelectedPlaylist",
      setSelectedTrack: "setSelectedTrack",
    }),
  },
})
export default class TreadingMusic extends Vue {
  @Prop({
    type: Object,
  })
  music: any;
  @Prop(Boolean) isLoading!: boolean;

  items = [{}, {}, {}, {}, {}, {}];

  getSelectedTrack(trackId: any) {
    const [selectedTrack] = this.music.tracks.filter(
      (track: any) => track.artist.id === trackId
    );
    const playList = this.music.tracks;
    this.setSelectedTrack(selectedTrack);
    this.setSelectedPlaylist(playList);
  }
}
</script>

<style lang="scss" scoped>
.app {
  &__treading {
    padding-top: 3rem;
  }

  &__artist {
    display: flex;
    margin-bottom: 1rem;

    & h2 {
      color: #dbdbdb;
      margin-top: 0.3rem;
    }

    & img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    &--content {
      margin-left: 1rem;

      & p {
        margin-top: -1.2rem;
        font-size: 0.8rem;
        color: #dbdbdb;

        & span {
          color: #c7577d;
          font-weight: 600;
        }
      }
    }
  }
}

.app {
}
</style>