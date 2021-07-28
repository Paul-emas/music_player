<template>
  <div class="search">
    <b-field>
      <b-autocomplete
        :data="data"
        placeholder="Search for music...."
        field="title"
        :loading="isFetching"
        @typing="getAsyncData"
        class="search-input"
        @select="(option) => getMusic(option)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img :src="props.option.album.cover_medium" />
            </div>
            <div class="media-content">
              {{ props.option.title }}
              <br />
              <small>
                <b>{{ props.option.artist.name }}</b>
              </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions({
      fetchSong: 'music/searchMusic',
    }),
    ...mapMutations({
      setSelectedPlaylist: 'music/setSelectedPlaylist',
      setSelectedTrack: 'music/setSelectedTrack',
    }),
  },
})
export default class Search extends Vue {
  data: any = [];
  isFetching = false;
  selected: any = null;
  fetchSong: any;
  setSelectedPlaylist: any;
  setSelectedTrack: any;

  getMusic(musicTrack: any) {
    this.setSelectedTrack(musicTrack);
    if (this.$router.currentRoute.name !== 'Player') {
      this.$router.push({ path: '/player' });
    }
  }

  getAsyncData(name: any) {
    if (!name.length) {
      this.data = [];
      this.isFetching = false;
      return;
    }
    this.isFetching = true;
    this.fetchSong(name)
      .then(({ data }: any) => {
        this.data = [];
        this.setSelectedPlaylist(data);
        data.forEach((item: any) => this.data.push(item));
      })
      .catch((error: any) => {
        this.data = [];
        throw error;
      })
      .finally(() => {
        this.isFetching = false;
      });
  }
}
</script>

<style lang="scss">
.search {
  min-width: 50%;

  @media screen and (max-width: 768px) {
    min-width: 70%;
  }

  & .autocomplete .dropdown-content {
    margin-top: 0.8rem;
    max-height: 20rem;
    background-color: #151a3f;

    & .dropdown-item:hover {
      background-color: #0f356e80 !important;
    }

    & .is-hovered {
      background-color: #0b0f30 !important;
    }

    & .media {
      & img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #fa8072;
      }
    }

    & .media-content {
      color: #fff;
      font-size: 1rem;
    }
  }
  &-input {
    margin-top: 0.5rem;
    & .control input {
      background-color: #1f2241 !important;
      padding: 1.5rem;
      border: none;
      border-radius: 2.5rem;
      color: #fff;
      box-shadow: none;
      text-align: center;

      &::placeholder {
        color: #fff;
        font-size: 1.1rem;
        font-family: 'Ubuntu', sans-serif;
      }
    }
  }
}
</style>
