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
.wrapper {
  background: #c7577d;
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: hidden;

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
    overflow-x: hidden;
  }

  &__content {
    padding: 0 4rem;
  }
}
</style>