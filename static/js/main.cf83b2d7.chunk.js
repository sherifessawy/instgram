(this.webpackJsonpinstgram=this.webpackJsonpinstgram||[]).push([[5],{20:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return s}));var r="/",c="/login",a="/signup",s="/p/:username"},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(6),c=Object(r.createContext)(null)},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(6),c=Object(r.createContext)(null)},32:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(36),c=Object(r.a)({apiKey:"AIzaSyDj3rGuMY9n-4kt8GHixk8mlHqQvgxVbhE",authDomain:"myinstgram-390ff.firebaseapp.com",projectId:"myinstgram-390ff",storageBucket:"myinstgram-390ff.appspot.com",messagingSenderId:"78129236829",appId:"1:78129236829:web:3c11f743e7e36234d6b6b4"})},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var r=n(6),c=n(33),a=n.n(c),s=n(30),u=n(7),i=n(20),o=n(11),l=n(26),j=n(28);var b=function(){var e=Object(r.useState)(JSON.parse(localStorage.getItem("authUser"))),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useContext)(l.a).firebase;return Object(r.useEffect)((function(){var e=Object(j.c)(Object(j.b)(a),(function(e){e?(localStorage.setItem("authUser",JSON.stringify(e)),c(e)):(localStorage.removeItem("authUser"),c(null))}));return function(){return e()}}),[]),{user:n}},f=n(31),d=n(8),O=function(){return Object(d.jsx)("div",{className:"flex min-h-screen",children:Object(d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-12 w-12 mx-auto h-full self-center",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[Object(d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"}),Object(d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 13a3 3 0 11-6 0 3 3 0 016 0z"})]})})},h=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(3),n.e(12)]).then(n.bind(null,85))})),m=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(8)]).then(n.bind(null,81))})),x=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(9)]).then(n.bind(null,86))})),p=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(3),n.e(10)]).then(n.bind(null,84))})),v=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,82))}));var g=function(){var e=b().user;return Object(d.jsx)(f.a.Provider,{value:{user:e},children:Object(d.jsx)(s.a,{children:Object(d.jsx)(r.Suspense,{fallback:Object(d.jsx)(O,{}),children:Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{path:i.b,element:e?Object(d.jsx)(u.a,{to:i.a}):Object(d.jsx)(m,{})}),Object(d.jsx)(u.b,{path:i.d,element:Object(d.jsx)(x,{})}),Object(d.jsx)(u.b,{path:i.c,element:Object(d.jsx)(p,{})}),Object(d.jsx)(u.b,{path:i.a,element:e?Object(d.jsx)(h,{}):Object(d.jsx)(u.a,{to:i.b})}),Object(d.jsx)(u.b,{path:"*",element:Object(d.jsx)(v,{})})]})})})})},k=(n(44),n(32));a.a.render(Object(d.jsx)(l.a.Provider,{value:{firebaseApp:k.a},children:Object(d.jsx)(g,{})}),document.getElementById("root"))}},[[45,6,7]]]);
//# sourceMappingURL=main.cf83b2d7.chunk.js.map