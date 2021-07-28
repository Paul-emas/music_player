<template>
  <div class="wrapper">
    <div class="wrapper__relative">
      <div class="wrapper__container">
        <div class="wrapper__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  // overflow: hidden;
}
.wrapper {
  background: #0b0f30;
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: auto;

  &__relative {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  &__container {
    width: 100%;
    height: 100vh;
    background-color: #0b0f30;
  }

  &__content {
    padding: 0 4rem;

    @media screen and (max-width: 768px) {
      padding: 0 2rem;
    }
  }
}
</style>
