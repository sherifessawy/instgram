(this.webpackJsonpinstgram=this.webpackJsonpinstgram||[]).push([[8],{50:function(n,e,t){"use strict";t.d(e,"b",(function(){return b})),t.d(e,"g",(function(){return l})),t.d(e,"e",(function(){return O})),t.d(e,"f",(function(){return h})),t.d(e,"a",(function(){return f})),t.d(e,"c",(function(){return p})),t.d(e,"d",(function(){return g}));var c,a,r,i,u,s,o,d=t(46),j=t(47),b=j.a.form(c||(c=Object(d.a)(["\n    padding: 1.5em;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background: white;\n    max-width: 380px;\n"]))),l=j.a.h1(a||(a=Object(d.a)(["\n    \n"]))),O=j.a.img(r||(r=Object(d.a)(["\n    width: 150px;\n    margin: 0.25rem 0;\n"]))),h=j.a.input(i||(i=Object(d.a)(["\n    background: lightblue;\n    padding: 0.5rem 1rem;\n    margin-top: 1em;\n    width: 100%;\n    border-radius: 4px;\n\n    &:last-of-type{\n        margin-top: 0.5em;\n    }\n"]))),f=j.a.button(u||(u=Object(d.a)(["\n    background: #038cfc;\n    color: white;\n    font-weight: bold;\n    width: ","%;\n    margin-top: 0.5rem;\n    padding: 3px;\n    border-radius: 4px;\n\n    &:hover{\n        background: ",";\n    }\n\n    opacity: ",";\n    cursor: ",";\n    \n"])),(function(n){var e=n.width;return e||"100"}),(function(n){return n.disabled?"#038cfc":"#4fa4e0"}),(function(n){return n.disabled?"0.5":"1"}),(function(n){return n.disabled&&"unset"})),p=j.a.p(s||(s=Object(d.a)(["\n    margin: 2em 0 1em 0;\n"]))),g=j.a.div(o||(o=Object(d.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    max-width: 720px;\n    margin: 0 auto;\n    min-height: 100vh;\n"])))},53:function(n,e,t){"use strict";var c=t(48),a=t(51),r=(t(6),t(50)),i=t(8),u=["children"],s=["children"],o=["children"],d=["children"],j=["children"],b=["children"];function l(n){var e=n.children,t=Object(a.a)(n,u);return Object(i.jsx)(r.b,Object(c.a)(Object(c.a)({},t),{},{children:e}))}l.Title=function(n){var e=n.children,t=Object(a.a)(n,s);return Object(i.jsx)(r.g,Object(c.a)(Object(c.a)({},t),{},{children:e}))},l.Image=function(n){var e=Object.assign({},n);return Object(i.jsx)(r.e,Object(c.a)({},e))},l.Input=function(n){var e=n.children,t=Object(a.a)(n,o);return Object(i.jsx)(r.f,Object(c.a)(Object(c.a)({},t),{},{children:e}))},l.Button=function(n){var e=n.children,t=Object(a.a)(n,d);return Object(i.jsx)(r.a,Object(c.a)(Object(c.a)({},t),{},{children:e}))},l.Footer=function(n){var e=n.children,t=Object(a.a)(n,j);return Object(i.jsx)(r.c,Object(c.a)(Object(c.a)({},t),{},{children:e}))},l.Frame=function(n){var e=n.children,t=Object(a.a)(n,b);return Object(i.jsx)(r.d,Object(c.a)(Object(c.a)({},t),{},{children:e}))},e.a=l},59:function(n,e,t){"use strict";var c,a,r=t(46),i=(t(6),t(67)),u=t.n(i),s=t(60),o=t(47),d=t(8),j=Object(s.css)(c||(c=Object(r.a)(["\n  display: block;\n  margin: 0 auto;\n  align-self: center;\n"]))),b=o.a.div(a||(a=Object(r.a)(["\n    height: 100vh;\n    display: flex;\n"])));e.a=function(){return Object(d.jsx)(b,{className:"bg-gray-100",children:Object(d.jsx)(u.a,{loading:!0,css:j})})}},81:function(n,e,t){"use strict";t.r(e),t.d(e,"default",(function(){return f}));var c=t(0),a=t.n(c),r=t(2),i=t(11),u=t(6),s=t(53),o=t(7),d=t(30),j=t(20),b=t(26),l=t(28),O=t(59),h=t(8);function f(){Object(u.useEffect)((function(){document.title="Login - Instagram"}),[]);var n=Object(u.useState)(""),e=Object(i.a)(n,2),t=e[0],c=e[1],f=Object(u.useState)(""),p=Object(i.a)(f,2),g=p[0],m=p[1],x=Object(u.useState)(""),v=Object(i.a)(x,2),w=v[0],y=v[1],k=Object(u.useState)(!1),I=Object(i.a)(k,2),S=I[0],C=I[1],F=""===g||""===t,N=Object(u.useContext)(b.a).firebaseApp,T=Object(o.g)();function A(){return A=Object(r.a)(a.a.mark((function n(e){var r;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),C(!0),r=Object(l.b)(N),n.next=5,Object(l.d)(r,t,g).then((function(n){T(j.a)})).catch((function(n){C(!1),c(""),m("");var e=n.message;y(e)}));case 5:case"end":return n.stop()}}),n)}))),A.apply(this,arguments)}return S?Object(h.jsx)(O.a,{}):Object(h.jsx)("div",{style:{background:"#fafafa"},children:Object(h.jsxs)(s.a.Frame,{children:[Object(h.jsx)("img",{src:"https://drive.google.com/uc?id=19p92C5QMfNKZZ9fTNn1AzqOjSY2mQP6r",alt:"iphone with profile",style:{width:"50%",maxWidth:"370px"}}),Object(h.jsxs)(s.a,{method:"POST",children:[Object(h.jsx)(s.a.Image,{src:"./images/logo.png"}),Object(h.jsx)(s.a.Input,{placeholder:"email",type:"email",onChange:function(n){return c(n.target.value)},value:t}),Object(h.jsx)(s.a.Input,{placeholder:"password",type:"password",onChange:function(n){return m(n.target.value)},value:g}),Object(h.jsx)(s.a.Button,{disabled:F,onClick:function(n){return function(n){return A.apply(this,arguments)}(n)},children:"Log In"}),w&&Object(h.jsx)("p",{className:"text-xs text-red-500 mg-to-50px mt-4",children:w}),Object(h.jsxs)(s.a.Footer,{children:["Don't have an account?",Object(h.jsx)(d.b,{to:j.d,children:Object(h.jsx)("strong",{children:" Sign up"})})]})]})]})})}}}]);
//# sourceMappingURL=8.1bd35078.chunk.js.map