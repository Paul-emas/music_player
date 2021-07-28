<template>
  <div class="player">
    <Controller />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Controller from "@/components/player/Controller.vue";

@Component({
  components: {
    Controller,
  },
})
export default class Play extends Vue {}
</script>