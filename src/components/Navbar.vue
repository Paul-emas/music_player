<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Paul Music player" class="navbar__logo--img" />
      </router-link>
    </div>
    <search />
    <div class="navbar__profile">
      <b-icon pack="fa" icon="bell" size="is-medium"> </b-icon>
      <img src="../assets/Profile.jpg" alt="User profile image" />
    </div>
  </nav>
</template>

<script>
import { Vue, Prop, Component } from 'vue-property-decorator';
import Search from './Search.vue';

@Component({
  components: {
    Search,
  },
})
export default class Navbar extends Vue {}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #0b0f30 !important;
  padding: 0.5rem 1rem;
  padding-right: 3rem;
  border-bottom: 1px solid #1453b180;

  &__logo {
    width: 4rem;
    height: 4rem;

    &--img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__profile {
    color: #fff;
    margin-top: 0.5rem;
    cursor: pointer;
    display: flex;

    & .fa-bell {
      margin-top: 1rem;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    & img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
      padding: 0.2rem;
      margin-left: 0.5rem;
      border: 1px solid #fa8072;
      background: linear-gradient(to right, #c02a5f, #3360a0);
    }
  }
}
</style>
