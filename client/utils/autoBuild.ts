import path from 'path';

let CopyPatterns = [
    
    // ~ 静态资源 resource 服务
    { 
      from: path.resolve(__dirname, "dist", "_nuxt"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","_nuxt"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "assets"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","assets"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "favicon.ico"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","favicon.ico"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "200.html"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","200.html"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "404.html"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","404.html"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "index.html"), 
      to: path.resolve(__dirname, "..", "resource","src","main","resources","static","index.html"),
      force: true
    },

    // ~ 页面资源 security 服务
    { 
      from: path.resolve(__dirname, "dist", "login"), 
      to: path.resolve(__dirname, "..", "security","src","main","resources","templates","login"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "logout"), 
      to: path.resolve(__dirname, "..", "security","src","main","resources","templates","logout"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "register"), 
      to: path.resolve(__dirname, "..", "security","src","main","resources","templates","register"),
      force: true
    },
    { 
      from: path.resolve(__dirname, "dist", "forgot-password"), 
      to: path.resolve(__dirname, "..", "security","src","main","resources","templates","forgot-password"),
      force: true
    }
];

export default CopyPatterns;