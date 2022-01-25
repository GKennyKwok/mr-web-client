<template>
  <div>
    <div class="form-group">
      <p class="lead-social">使用第三方账号</p>
    </div>
    <div class="form-group">
      <button class="btn btn-signin-social">
        <i class="fa fa-qq"></i>
      </button>
      <button class="btn btn-signin-social">
        <i class="fa fa-weixin"></i>
      </button>
      <button class="btn btn-signin-social">
        <i class="fa fa-weibo"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/styles/scss/base/variables";
@import "~/assets/styles/scss/mixins/css3";
@import "~/assets/styles/scss/partials/helpers";
.btn-signin-social {
  @include inline-block;
  @extend .m-b-5;
  // padding: 10px 22px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  background-color: var(--font-fff);
  border-color: var(--font-ccc);
  margin: 0 15px;

  &:hover,
  &:focus {
    background-color: var(--font-eee);
  }

  i {
    @extend .font-30;
    // margin: 5px;

    &.fa-qq:before {
      color: deepskyblue;
    }
    &.fa-weixin:before {
      color: #1aad19;
    }
    &.fa-weibo:before {
      color: #e6162d;
    }
  }
}
</style>