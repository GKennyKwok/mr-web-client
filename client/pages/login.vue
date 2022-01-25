<!-- 表单登录 -->

<template>
  <div class="card login">
    <div class="header">
      <p class="lead">登录您的账号</p>
    </div>
    <div class="body">
      <b-form class="form-auth-small" action="/login" method="post" ref="loginForm" @submit.prevent="onSubmit">
        <input name="_csrf" type="hidden" title="csrf" th:if="${_csrf}" th:value="${_csrf.token}" />

        <b-form-group
          class="c_form_group"
          id="input-group-username"
          label-for="input-username"
        >
          <b-form-input
            id="input-username"
            class="form-control"
            v-model="$v.form.username.$model"
            name="username"
            type="text"
            placeholder="请输入您的账号"
            :state="validateState('username')"
            aria-describedby="input-username-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-username-feedback">
            账号必须为字母和数字组合，长度在4至16个字符之间<br />
            或者输入正确的邮箱地址
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          class="c_form_group"
          id="input-group-password"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            class="form-control"
            v-model="$v.form.password.$model"
            name="password"
            type="password"
            placeholder="请输入您的密码"
            :state="validateState('password')"
            aria-describedby="input-password-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-password-feedback">
            密码长度必须在6至32个字符之间
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="d-flex justify-content-between mt-3">
          <b-form-checkbox
            v-model="$v.form.remember.$model"
            name="remember-me"
            id="checkbox-login-remember"
            class="fancy-checkbox element-left"
          >
            7天内保持登录
          </b-form-checkbox>
          <div class="forgot-password">
            <a :href="forgotPasswordPath">
            <!-- <b-link :to="forgotPasswordPath"> -->
              <span class="helper-text">
                <b-icon-lock-fill></b-icon-lock-fill>忘记密码?
              </span>
            <!-- </b-link> -->
            </a>
          </div>
        </div>

        <b-form-group id="input-group-submit">
          <b-button
            type="submit"
            variant="primary"
            block
            >登录</b-button
          >
        </b-form-group>
      </b-form>

      <div class="separator-linethrough"><span>或</span></div>

      <mo-social-account />

      <div class="bottom">
        <span>
          还没有账号？立即去
          <a :href="registerPath">注册</a>！
          <!-- <b-link :to="registerPath" no-prefetch>注册</b-link>！ -->
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "nuxt-property-decorator";
import {
  required,
  minLength,
  maxLength,
  or,
  email,
} from "vuelidate/lib/validators";
import {
  BIconCheckSquareFill,
  BIconXCircleFill,
  BIconExclamationTriangleFill,
  BIconLockFill,
} from "bootstrap-vue";
import PAGE from "~/utils/pageUrlPath";

/**
 * 登录表单数据
 */
export interface LoginForm {
    username: string | null;
    password: string | null;
    remember: boolean;
}

@Component({
  layout: "auth",
  components: {
    BIconCheckSquareFill,
    BIconXCircleFill,
    BIconExclamationTriangleFill,
    BIconLockFill,
  }
})
class Page extends Vue {
  
  form: LoginForm = {
    username: null,
    password: null,
    remember: false,
  };

  registerPath:string = PAGE.ACCOUNT.REGISTER;
  forgotPasswordPath:string = PAGE.ACCOUNT.FORGOT_PASSWORD;

  validations() {
    return {
      form: {
        username: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(16),
          or: or(email, (value: string) => {
            // 检查用户名是否有 非法字符
            let reg = new RegExp("[^a-zA-Z0-9]", "i");
            return !reg.test(value);
          }),
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(32),
        },
        remember: {},
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

    (this.$refs.loginForm as HTMLFormElement).submit();
  }
}
export default Page;
</script>

<style lang="scss">
.forgot-password {
  padding-top: 1px;

  & a {
    text-decoration: underline;
  }
}

.submit-overlay {
  width: 100%;
  margin-top: 50%;
}
</style>