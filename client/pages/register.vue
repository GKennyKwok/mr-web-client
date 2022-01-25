<!-- 表单注册 -->

<template>
  <div class="card register">
    <div class="header">
      <p class="lead">创建您的账号</p>
    </div>
    <div class="body">
      <b-form class="form-auth-small" action="/register" method="post" @submit.stop.prevent="onSubmit">
        <input name="_csrf" type="hidden" title="csrf" v-model="$v.form._csrf.$model" />

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
            placeholder="请输入您的账号或者邮箱"
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

        <b-form-group
          class="c_form_group"
          id="input-group-confirmPassword"
          label-for="input-confirmPassword"
        >
          <b-form-input
            id="input-confirmPassword"
            class="form-control"
            v-model="$v.form.confirmPassword.$model"
            name="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            :state="validateState('confirmPassword')"
            aria-describedby="input-confirm-password-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-confirm-password-feedback">
            两次输入的密码不相同
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="d-flex justify-content-between mt-3">
          <b-form-checkbox
            id="checkbox-agreement"
            v-model="$v.form.agreement.$model"
            name="agreement"
            :state="validateState('agreement')"
            class="fancy-checkbox element-left"
          >
            同意用户协议
          </b-form-checkbox>
          <div class="user-agreement">
            <span v-b-modal.modal-user-agreement>查看用户协议</span>
          </div>
        </div>

        <b-form-group id="input-group-submit">
          <b-button
            type="submit"
            variant="primary"
            block
            >注册</b-button
          >
        </b-form-group>
      </b-form>

      <div class="separator-linethrough"><span>或</span></div>

      <mo-social-account />

      <div class="bottom">
        <span>
          已有账号？立刻去
          <a :href="loginPath">登录</a>！
          <!-- <b-link :to="loginPath">登录</b-link>！ -->
        </span>
      </div>
    </div>

    <mo-user-agreement-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "nuxt-property-decorator";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
  or,
} from "vuelidate/lib/validators";
import {
  BIconCheckSquareFill,
  BIconXCircleFill,
  BIconExclamationTriangleFill,
} from "bootstrap-vue";
import PAGE from "~/utils/pageUrlPath";
import { RegisterForm, RegisterResult } from "~/store/account/register";

@Component({
  layout: "auth",
  components: {
    BIconCheckSquareFill,
    BIconXCircleFill,
    BIconExclamationTriangleFill,
  },
})
class Page extends Vue {

  loginPath:string = PAGE.ACCOUNT.LOGIN;
  registerPath:string = PAGE.ACCOUNT.REGISTER;

  form: RegisterForm = {
    username: null,
    password: null,
    confirmPassword: null,
    agreement: false,
    _csrf: null
  };

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
        confirmPassword: {
          required,
          sameAsPassword: sameAs("password"),
        },
        agreement: {
          isUnique(value: boolean) {
            return value;
          },
        },
        _csrf: {
          required
        }
      },
    };
  }

  validateState(name: string) {
    const { $dirty, $error } = this.$v.form[name]!;
    return $dirty ? !$error : null;
  }

  timeKey: number = -1;
  redirect: Function = () => {
    let redirectUrl: string = this.$route.query.ref
      ? (this.$route.query.ref as string)
      : "/";
    this.$router.push({ path: redirectUrl });
    this.timeKey = -1;
  };

  refresh: Function = () => {
    this.$router.go(0);
    this.timeKey = -1;
  }

  async onSubmit(event: MouseEvent) {
    // ~ 获取 CSRF Token
    // console.log("register vue this: %O", this)
    if(this.$nuxt.$csrf && this.$nuxt.$csrf.token) {
      this.form._csrf = this.$nuxt.$csrf.token!;
    }

    this.$v.form.$touch();
    if (this.$v.form.$anyError) {
      return;
    }
    let result: RegisterResult = await this.$store.dispatch(
      "account/register/doRegister", this.form
    );

    // ~ 结果提示
    this.$bvToast.toast(result.message, {
      title: result.result ? "注册成功" : "注册失败",
      autoHideDelay: 5000,
      variant: result.result ? "success" : "danger",
      toaster: "b-toaster-top-center",
    });

    if(result.result){
      // ~ 跳转到上个页面或首页
      this.timeKey = setTimeout(this.redirect, 3000);
    } else {
      // ~ 刷新当前页面
      this.timeKey = setTimeout(this.refresh, 3000);
    }
  }
}
export default Page;
</script>

<style lang="scss">
.user-agreement {
  padding-top: 1px;

  & span {
    cursor: pointer;
    color: var(--primary-color);
    text-decoration: underline;
  }
}

.submit-overlay {
  width: 100%;
  margin-top: 50%;
}
</style>