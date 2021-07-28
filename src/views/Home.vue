<template>
  <div class="home">
    <Music />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Music from "@/components/music/Music.vue";

@Component({
  components: {
    Music,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.carousel-list {
  box-shadow: none !important;
}
</style>
