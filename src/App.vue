<template>
  <div id="app">
    <error-modal />
    <Navbar />
    <Wrapper>
      <router-view />
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Wrapper from "@/components/layouts/Wrapper.vue";
import Navbar from "@/components/Navbar.vue";
import ErrorModal from "./components/layouts/ErrorModal.vue";

@Component({
  components: {
    Wrapper,
    Navbar,
    ErrorModal,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
