import{r as i,u as v,c as e,F as t,j as s,L as g,a as N}from"./index-f619bc13.js";function b(){const[n,r]=i.exports.useState(""),[l,o]=i.exports.useState(""),h=v(),[m,c]=i.exports.useState(""),[d,u]=i.exports.useState("");return e(t,{children:["  ",s("div",{children:s(g,{to:"/",children:" return to home "})}),e("form",{className:"form-login",onSubmit:a=>{a.preventDefault(),N.signInWithEmailAndPassword(n,l).then(()=>{u("Signup successful, you will be redirected to Home page!!"),r(""),o(""),c(""),setTimeout(()=>{u(""),h("/")},3e3)}).catch(p=>c(p.message))},children:[s("h3",{children:" Please log in to your existing account "}),e("div",{children:[e("div",{children:["  ",s("input",{type:"email",placeholder:"Email",className:"input-login",onChange:a=>r(a.target.value),value:n,required:!0})," "]}),e("div",{children:["  ",s("input",{type:"text",placeholder:"Password",className:"input-login",onChange:a=>o(a.target.value),value:l,required:!0})," "]}),e("div",{className:"btnLogin",children:[s("button",{className:"btn-login",children:" LOGIN"}),e("div",{className:"login-signup",children:["  ",s(g,{className:"logindec",to:"/Signup",children:"SIGNUP"})," "]})]})]}),s("div",{className:"loginmsg",children:d&&e(t,{children:[e("p",{children:[" ",d]})," "]})}),s("div",{className:"loginmsg",children:m&&e(t,{children:[s("div",{children:" Invalid email or password"})," "]})})]})]})}export{b as default};