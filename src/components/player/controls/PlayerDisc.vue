<template>
  <div class="player__image">
    <div
      :class="togglePlay ? '' : 'pause-animation'"
      class="player__image--card"
    >
      <img v-if="url !== ''" :src="url" alt="muisc bg image" />
      <img v-else src="../../../assets/player.png" alt="muisc bg image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PlayerDisc extends Vue {
  @Prop(Boolean) readonly togglePlay!: boolean;
  @Prop({
    type: String,
    default: "",
  })
  readonly url: any;
}
</script>

<style>
</style>