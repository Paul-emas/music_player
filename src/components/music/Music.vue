<template>
  <div class="music">
    <treading-music :isLoading="isLoading" :music="martinPlaylist"
      >Trending Edm Songs</treading-music
    >
    <treading-music :isLoading="isLoading" :music="marshMelloMusics"
      >Best From Marshmello</treading-music
    >
    <treading-music :isLoading="isLoading" :music="kygoMusics"
      >A Taste of Kygo</treading-music
    >
  </div>
</template>

<script lan>
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions, mapMutations } from "vuex";

import TreadingMusic from "./TreadingMusic.vue";

@Component({
  components: {
    TreadingMusic,
  },
  computed: {
    ...mapGetters({
      trendingPlaylist: "music/trendingPlaylist",
      marshMelloPlaylist: "music/marshMelloPlaylist",
      kyoPlaylist: "music/kyoPlaylist",
      isLoading: "music/isLoading",
    }),
  },
  methods: {
    ...mapActions({
      getTrendingMusic: "music/getTrendingPlaylist",
      getMarshMelloMusic: "music/getMarshMelloPlayList",
      getKygoMusic: "music/getKygoPlayList",
    }),

    ...mapMutations({
      setLoading: "music/setLoading",
    }),
  },
})
export default class Music extends Vue {
  martinPlaylist = {};
  kygoMusics = {};
  marshMelloMusics = {};
  trendingArtist = {};

  async mounted() {
    this.setLoading(true);
    if (this.trendingPlaylist.tracks) {
      this.setupMuiscTrack();
    } else {
      await Promise.all([
        this.getTrendingMusic(),
        this.getMarshMelloMusic(),
        this.getKygoMusic(),
      ]);
      this.setupMuiscTrack();
    }
  }

  setupMuiscTrack() {
    this.setLoading(false);
    if (this.trendingPlaylist.tracks) {
      const { data } = this.trendingPlaylist.tracks;
      this.martinPlaylist = { tracks: data };
    }

    if (this.marshMelloPlaylist.tracks) {
      const { data } = this.marshMelloPlaylist.tracks;
      this.marshMelloMusics = { tracks: data };
    }

    if (this.kyoPlaylist.tracks) {
      const { data } = this.kyoPlaylist.tracks;
      this.kygoMusics = { tracks: data };
    }
  }
}
</script>

<style>
.music {
  padding-bottom: 10rem;
}
</style>