<template>
  <!-- Page Loader -->
  <transition name="fade">
    <div class="page-loader-wrapper" v-show="loading">
      <div class="loader">
        <div class="m-t-30">
          <img
            src="/assets/images/icon.svg"
            width="40"
            height="40"
            alt="Mooli"
          />
        </div>
        <p>Please wait...</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
class Loading extends Vue {
  loading = true;

  start() {
    this.loading = true;
  }
  finish() {
    this.loading = false;
  }
}
export default Loading;
</script>

<style lang="scss">
@import "~/assets/styles/scss/base/variables";
@import "~/assets/styles/scss/partials/helpers";
.page-loader-wrapper {
  @extend .align-center;
  background: var(--body-color);
  position: fixed;
  overflow: hidden;
  z-index: 99999999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  p {
    @extend .m-t-10;
    color: var(--dark-color);
  }

  .loader {
    position: relative;
    top: calc(40% - 30px);
  }
}
</style>