(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{21:function(e,t,c){},29:function(e,t,c){},30:function(e,t,c){},31:function(e,t,c){},37:function(e,t,c){},38:function(e,t,c){},39:function(e,t,c){},44:function(e,t,c){},45:function(e,t,c){},46:function(e,t,c){},47:function(e,t,c){},48:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(22),i=c.n(a),r=(c(29),c(9)),o=c(3),l=(c(30),c(5));c(31);var j=c(0);var b=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)(""),i=Object(l.a)(a,2),o=i[0],b=i[1],d=Object(n.useState)(""),h=Object(l.a)(d,2),u=h[0],O=h[1],m=Object(n.useState)(!1),x=Object(l.a)(m,2),p=(x[0],x[1],Object(n.useState)(!1)),v=Object(l.a)(p,2);return v[0],v[1],Object(j.jsxs)("div",{className:"Create-Container",children:[void 0,Object(j.jsxs)("div",{className:"Create-Bubble-Container",children:[Object(j.jsx)("h1",{children:"Welcome to Calendarify."}),Object(j.jsx)("form",{className:"Create-Bubble",children:Object(j.jsxs)("div",{className:"Create-Text",children:[Object(j.jsx)("h1",{children:"Create an account"}),Object(j.jsx)("input",{onChange:function(e){s(e.target.value)},value:c,className:"Create-input",placeholder:"Username"}),Object(j.jsx)("input",{onChange:function(e){b(e.target.value)},value:o,className:"Create-input",placeholder:"Email"}),Object(j.jsx)("input",{type:"password",onChange:function(e){O(e.target.value)},value:u,className:"Create-input",placeholder:"Password"}),void 0,Object(j.jsx)("button",{className:"Create-button",children:"Create!"})]})}),Object(j.jsx)(r.b,{to:"/login",children:Object(j.jsx)("button",{className:"Login-create-div",children:Object(j.jsx)("p1",{children:"Login"})})})]})]})},d=c(24);c(37);var h=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)(""),i=Object(l.a)(a,2),o=(i[0],i[1],Object(n.useState)("")),b=Object(l.a)(o,2),h=b[0],u=b[1];return Object(j.jsx)("div",{className:"Login-Container",children:Object(j.jsxs)("div",{className:"Login-Bubble-Container",children:[Object(j.jsx)("h1",{children:"Welcome to Calendarify."}),Object(j.jsx)("div",{className:"Login-Bubble",children:Object(j.jsxs)("div",{className:"Login-Text",children:[Object(j.jsx)("h1",{children:"Login"}),Object(j.jsx)("input",{type:"text",onChange:function(e){s(e.target.value)},value:c,className:"Login-input",placeholder:"Username"}),Object(j.jsx)("input",Object(d.a)({type:"password",onChange:function(e){u(e.target.value)},value:h,className:"Login-input",placeholder:"Password"},"type","password")),Object(j.jsx)(r.b,{to:"/lobby",children:Object(j.jsx)("button",{className:"Login-button",children:"Log in"})})]})}),Object(j.jsx)(r.b,{to:"/create",children:Object(j.jsx)("button",{className:"Login-create-div",children:Object(j.jsx)("p1",{children:"Create an account"})})})]})})},u=(c(38),c(39),c(19)),O=c.n(u);var m=c(10),x=c(11);var p=function(){var e=Object(n.useState)(O()()),t=Object(l.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)([]),i=Object(l.a)(a,2),r=i[0],o=i[1],b=Object(n.useState)(O()()),d=Object(l.a)(b,2),h=d[0],u=d[1],p=c.clone().startOf("month"),v=c.clone().endOf("month");return Object(n.useEffect)((function(){o(function(e){for(var t=e.clone().startOf("month").startOf("week").clone().subtract(1,"day"),c=e.clone().endOf("month").endOf("week"),n=[];t.isBefore(c,"day");)n.push(Array(7).fill("").map((function(){return t.add(1,"day").clone()})));return n}(c))}),[c]),Object(j.jsxs)("div",{className:"calendar-box",children:[Object(j.jsxs)("div",{className:"month-selector",children:[Object(j.jsx)(m.a,{icon:x.b,onClick:function(){s(c.clone().subtract(1,"month"))}}),c.format("MMMM"),"\xa0\xa0",c.format("YYYY"),Object(j.jsx)(m.a,{icon:x.c,onClick:function(){s(c.clone().add(1,"month"))}})]}),r.map((function(e){return Object(j.jsx)("div",{children:e.map((function(e){return Object(j.jsx)("div",{className:p.isAfter(e)||v.isBefore(e)?"diffMonthDay":"day",onClick:function(){return function(e){p.isAfter(e)||v.isBefore(e)||u(e)}(e)},children:Object(j.jsx)("div",{className:h.isSame(e,"day")&&c.format("M")===e.format("M")?"selected":"",children:e.format("D")})})}))})}))]})},v=(c(21),c.p+"static/media/default-profile.697fdcd2.png");var f=function(e){var t=e.username;return Object(j.jsxs)("div",{className:"online-profile-box",children:[Object(j.jsx)("img",{src:v,className:"profile-picture-online",alt:"Profile avatar"}),Object(j.jsx)("p1",{children:t})]})};c(44),c(45);var N=function(){return Object(j.jsxs)("div",{className:"Texting-inner-container",children:[Object(j.jsxs)("div",{className:"texting-input",children:[Object(j.jsx)("input",{placeholder:"Send message...",className:"texting-input-inner"}),Object(j.jsx)("button",{className:"texting-button",children:Object(j.jsx)(m.a,{icon:x.a})})]}),Object(j.jsxs)("div",{className:"texting-convo",children:[Object(j.jsxs)("div",{className:"message",children:[Object(j.jsx)("p1",{className:"message-sender",children:"Me"}),Object(j.jsx)("div",{className:"message-bubble",children:Object(j.jsx)("p1",{children:"Okay, we should probably get more of the backend done in the meantime before our meeting"})})]}),Object(j.jsxs)("div",{className:"message-other",children:[Object(j.jsx)("p1",{className:"message-sender-other",children:"Simon"}),Object(j.jsx)("div",{className:"message-bubble-other",children:Object(j.jsx)("p1",{children:"Cool with me"})})]}),Object(j.jsxs)("div",{className:"message",children:[Object(j.jsx)("p1",{className:"message-sender",children:"Me"}),Object(j.jsx)("div",{className:"message-bubble",children:Object(j.jsx)("p1",{children:"Our checkpoint is scheduled for next week, I'm gonna add it to the calendar, is that cool with everyone?"})})]}),Object(j.jsxs)("div",{className:"message-other",children:[Object(j.jsx)("p1",{className:"message-sender-other",children:"Fulton"}),Object(j.jsx)("div",{className:"message-bubble-other",children:Object(j.jsx)("p1",{children:"It was okay, not the easiest one but it wasn't crazy hard in my opinion."})})]}),Object(j.jsxs)("div",{className:"message-other",children:[Object(j.jsx)("p1",{className:"message-sender-other",children:"Christopher"}),Object(j.jsx)("div",{className:"message-bubble-other",children:Object(j.jsx)("p1",{children:"How did everyone do on the homework? I thought it wasn't too bad."})})]})]})]})};var g=function(){return Object(j.jsxs)("div",{className:"chat-container-inner",children:[Object(j.jsx)("p1",{className:"chat-header",children:"Chat"}),Object(j.jsxs)("select",{className:"dropdown",children:[Object(j.jsx)("option",{children:"Everyone"}),Object(j.jsx)("option",{children:"Jordan"}),Object(j.jsx)("option",{children:"Christopher"}),Object(j.jsx)("option",{children:"Fulton"}),Object(j.jsx)("option",{children:"Simon"})]}),Object(j.jsx)("div",{className:"texting-container",children:Object(j.jsx)(N,{})})]})};var C=function(){return Object(j.jsxs)("div",{className:"social-container",children:[Object(j.jsx)("h1",{className:"calendar-code",children:"Code: 373589"}),Object(j.jsxs)("div",{className:"online-bar",children:[Object(j.jsx)("p1",{className:"number-online",children:"Online: (4)"}),Object(j.jsxs)("div",{className:"scrolling-profile",children:[Object(j.jsx)(f,{username:"Jordan"}),Object(j.jsx)(f,{username:"Christopher"}),Object(j.jsx)(f,{username:"Fulton"}),Object(j.jsx)(f,{username:"Simon"})]})]}),Object(j.jsx)("div",{className:"chat-container",children:Object(j.jsx)(g,{})})]})};var y=function(){return Object(j.jsxs)("div",{className:"Home-container",children:[Object(j.jsx)("h1",{className:"Home-title",children:"Calendarify."}),Object(j.jsxs)("div",{className:"Home-content-container",children:[Object(j.jsx)("div",{className:"Calendar-container",children:Object(j.jsx)(p,{})}),Object(j.jsx)("div",{className:"Social-container",children:Object(j.jsx)(C,{})})]})]})};c(46),c(47);var L=function(e){var t=e.title,c=e.number;return Object(j.jsx)(r.b,{to:"/home",style:{textDecoration:"none"},children:Object(j.jsxs)("button",{className:"Lobby-calendar-bubble",children:[Object(j.jsx)("h1",{className:"Lobby-calendar-title",children:t}),Object(j.jsxs)("h1",{className:"Lobby-number",children:[c,"\xa0",Object(j.jsx)(m.a,{icon:x.d})]})]})})};var S=function(){return Object(j.jsxs)("div",{className:"Lobby-container",children:[Object(j.jsx)("h1",{className:"Lobby-title",children:"Calendarify."}),Object(j.jsxs)("div",{className:"Lobby-center-container",children:[Object(j.jsx)("h1",{children:"Your calendars"}),Object(j.jsxs)("div",{className:"Lobby-join-create-container",children:[Object(j.jsx)("button",{className:"Lobby-join-button",children:"Join someone's calendar"}),Object(j.jsx)("button",{className:"Lobby-create-button",children:"Create calendar"})]}),Object(j.jsxs)("div",{className:"Lobby-calendar-bubble-container",children:[Object(j.jsx)(L,{title:"CSE312 Group",number:"4"}),Object(j.jsx)(L,{title:"Family schedule",number:"4"}),Object(j.jsx)(L,{title:"Personal",number:"1"})]})]})]})};var w=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)("header",{className:"App-header",children:Object(j.jsx)(r.a,{children:Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.a,{path:"/create",exact:!0,component:b}),Object(j.jsx)(o.a,{path:"/login",exact:!0,component:h}),Object(j.jsx)(o.a,{path:"/home",exact:!0,component:y}),Object(j.jsx)(o.a,{path:"/lobby",exact:!0,component:S})]})})})})},k=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,49)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(w,{})}),document.getElementById("root")),k()}},[[48,1,2]]]);
//# sourceMappingURL=main.48d7467f.chunk.js.map