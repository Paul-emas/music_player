<template>
  <div class="player__length">
    <div class="player__length--slider">
      <b-field>
        <b-slider
          rounded
          :value="length"
          :max="duration"
          :tooltip="false"
        ></b-slider>
      </b-field>
    </div>
    <span class="counter">{{ timer }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PlayerSlider extends Vue {
  @Prop() readonly length!: number | string;
  @Prop(Number)
  readonly duration!: number;
  @Prop(String) readonly timer!: string;
}
</script>

<style>
</style>