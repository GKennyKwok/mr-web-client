<template>
  <div class="card page-400">
    <div class="header">
      <p class="lead">
        <span class="number left">404 </span
        ><span class="text">Oops! <br />Page Not Found</span>
      </p>
    </div>
    <div class="body">
      <p>
        找不到您要浏览的页面，<br />
        请 <a href="javascript:void(0);">联系我们</a> 报告此问题。
      </p>
      <div class="margin-top-30">
        <a @click="onGoBackPage" class="btn btn-default btn-lg btn-block">
          <b-icon-arrow-left></b-icon-arrow-left>
          <span>返回上一页</span>
        </a>
        <nuxt-link to="/" class="btn btn-dark btn-lg btn-block">
          <b-icon-house-door-fill></b-icon-house-door-fill>
          <span>首页</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { BIconArrowLeft, BIconHouseDoorFill } from "bootstrap-vue";

@Component({
  layout: "auth",
  components:{
    BIconArrowLeft,
    BIconHouseDoorFill
  }
})
class Page extends Vue {
  @Emit()
  onGoBackPage(event: MouseEvent) {
    this.$router.back();
  }
}
export default Page;
</script>