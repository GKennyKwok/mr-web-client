# About issue 10233
[issue 10233](https://github.com/nuxt/nuxt.js/issues/10233)

Middleware in client/layouts/auth.vue line 68
Because it is not available in the browser, it is now processed using the Mixins method
There is only client code here, which should not affect debugging

## Related documents:
- client/layouts/auth.vue
- client/middleware/csrf.ts
- client/pages/register.vue

