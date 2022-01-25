<template>
  <div class="card forgot-pass">
    <div class="header">
      <p class="lead">
        <strong>Oops</strong>,<br />
        忘记了密码?
      </p>
    </div>
    <div class="body">
      <b-form class="form-auth-small" action="/forgot-password" method="post" ref="forgotPasswordForm" @submit.prevent="onSubmit">
        <input name="_csrf" type="hidden" title="csrf" th:if="${_csrf}" th:value="${_csrf.token}" />

        <b-form-group
          class="c_form_group"
          id="input-group-email"
          label-for="input-email"
          label="注册时使用的邮箱"
        >
          <b-form-input
            id="input-email"
            class="form-control"
            v-model="$v.form.email.$model"
            name="email"
            type="email"
            placeholder="请输入您注册时使用的邮箱"
            :state="validateState('email')"
            aria-describedby="input-email-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-email-feedback">
            密码长度必须在6至32个字符之间
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-submit">
          <b-button type="submit" variant="primary" block>提交</b-button>
        </b-form-group>

        <div class="bottom">
          <span class="helper-text">
            想起密码了？立刻去
            <a :href="loginPath">登录</a>！
            <!-- <b-link :to="loginPath" no-prefetch>登录</b-link>！ -->
          </span>
        </div>
      </b-form>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import {
  BIconExclamationTriangleFill,
  BIconXCircleFill,
  BIconCheckSquareFill,
} from "bootstrap-vue";

import PAGE from "~/utils/pageUrlPath";

/**
 * 忘记密码表单数据
 */
export interface ForgotPasswordForm {
    email: string | null;
}

@Component({
  layout: "auth",
  components: {
    BIconExclamationTriangleFill,
    BIconXCircleFill,
    BIconCheckSquareFill,
  },
})
class Page extends Vue {
  form: ForgotPasswordForm = {
    email: null,
  };

  loginPath:string = PAGE.ACCOUNT.LOGIN;

  validations() {
    return {
      form: {
        email: {
          required,
          email: email,
        },
      },
    };
  }

  validateState(name: string) {
    const { $dirty, $error } = this.$v.form[name]!;
    return $dirty ? !$error : null;
  }

  onSubmit(event: MouseEvent) {
    this.$v.form.$touch();
    if (this.$v.form.$anyError) {
      return;
    }

    (this.$refs.forgotPasswordForm as HTMLFormElement).submit();
  }
}
export default Page;
</script>

<style lang="scss" scoped>
.submit-overlay {
  width: 100%;
  margin-top: 20%;
}
</style>