<template>
  <div v-if="error" class="error__modal">
    <div class="error__modal--card">
      <div class="content">
        <b-icon pack="fa" icon="exclamation-square"></b-icon>
        <h1 class="title is-3">Something went wrong</h1>
        <p>Cannot fetch songs try reloading the page</p>
        <!-- <button @click="incognito">Open incognito</button> -->
        <button @click="reload">Reload</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions, mapMutations } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      error: "music/error",
    }),
  },

  methods: {
    ...mapActions({}),
    ...mapMutations({}),
  },
})
export default class ErrorModal extends Vue {
  reload() {
    this.$router.go();
  }
}
</script>

<style lang="scss">
.error__modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0b0f30b6;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  //   display: none;

  &--card {
    width: 28rem;
    height: 23rem;
    background: linear-gradient(to right, #f74f89, #6287bb);
    border-radius: 0.5rem;
    border: 3px solid #fa8072;
    padding: 0.6rem;

    & .content {
      width: 100%;
      height: 100%;
      background-color: #fff;
      background-color: #0b0f30;
      text-align: center;
      padding-top: 4rem;

      & i {
        font-size: 3.5rem;
        color: #e63b77;
      }

      & .title {
        color: #fff;
        margin-bottom: 0.5rem;
      }

      & p {
        color: #6c73b3;
      }

      & button {
        padding: 1rem 2.2rem;
        border-radius: 0.5rem;
        border: none;
        margin-top: 2.5rem;
        font-weight: 600;
        cursor: pointer;
        color: #0b0f30;
      }
    }
  }
}
</style>