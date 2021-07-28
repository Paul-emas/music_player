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
    <b-carousel-list v-else :data="music.tracks" v-bind="al">
      <template slot="item" slot-scope="track">
        <music-card
          :title="track.title"
          :imageUrl="track.album.cover_medium"
          :id="track.id"
          :artist="track.artist.name"
          @getSelectedTrack="getSelectedTrack"
        />
      </template>
    </b-carousel-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

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
      setSelectedPlaylist: "music/setSelectedPlaylist",
      setSelectedTrack: "music/setSelectedTrack",
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
  setSelectedPlaylist: any;
  setSelectedTrack: any;
  al = {
    itemsToShow: 2,
    breakpoints: {
      768: {
        itemsToShow: 4,
      },
      1200: {
        itemsToShow: 5,
      },
      1500: {
        itemsToShow: 6,
      },
    },
  };

  getSelectedTrack(trackId: any) {
    const [selectedTrack] = this.music.tracks.filter(
      (track: any) => track.id === trackId
    );
    const { tracks } = this.music;
    this.setSelectedPlaylist(tracks);
    this.setSelectedTrack(selectedTrack);
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