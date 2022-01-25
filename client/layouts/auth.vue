<template>
  <div id="body" ref="body" class="theme-cyan">
    <!-- Page Loader -->
    <!-- <mo-loader :loading="loading" /> -->

    <div class="auth-main">
      <div class="auth_div vivify fadeIn">
        <div class="auth_brand">
          <a class="navbar-brand" href="#">
            <img
              src="/assets/images/icon.svg"
              width="50"
              class="d-inline-block align-top mr-2"
              alt=""
            />
            Mooli
          </a>
        </div>
        <transition name="fade">
          <Nuxt />
        </transition>
      </div>
      <div class="animate_lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import CSRFMixin from "~/mixins/csrf";

@Component<Layout>({
  head() {
    return {
      htmlAttrs: { lang: "zh-CN", ["data-theme"]: this.theme },
      headAttrs: {},
      bodyAttrs: {},
      meta: [
        {
          name: "_csrf",
          content: "",
          "th:if": "${_csrf}",
          "th:content": "${_csrf.token}",
          id: "_csrf",
        },
        {
          name: "_csrf_header",
          content: "",
          "th:if": "${_csrf.headerName}",
          "th:content": "${_csrf.headerName}",
          id: "_csrf_header",
        },
      ],
    };
  },
  middleware: "csrf",
  // mixins: [CSRFMixin],
})
class Layout extends Vue {
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
    // console.log("auth layout this: %O", this);
  }

  get theme(): string {
    return this.$store.state.global.theme;
  }
}

export default Layout;
</script>

