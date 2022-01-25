module.exports = {
    apps: [
        {
            name: 'guimingrun.com',
            // exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/@nuxt/typescript-runtime/bin/nuxt-ts.js',
            args: 'start'
        }
    ]
}