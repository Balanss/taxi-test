import{r as e,s as U,j as r,F as ee,a,G as V,A as j,d as c,c as p,f as F,T as u,h as te,b as m,Q as se,i as ne}from"./index-adb3a795.js";import{u as re,N as ae,G as oe,M as ie,D as le}from"./esm-f88a55dc.js";function me(){function T(){const[t,s]=e.exports.useState(null);return e.exports.useEffect(()=>{p.onAuthStateChanged(n=>{n&&s(n.uid)})},[]),t}const I=T();function Q(){const[t,s]=e.exports.useState(null);return e.exports.useEffect(()=>{p.onAuthStateChanged(n=>{n?F.collection("admin").doc(n.uid).get().then(o=>{s(o.data().FullName)}):s(null)})},[]),t}const d=Q();function z(){const[t,s]=e.exports.useState(null);return e.exports.useEffect(()=>{p.onAuthStateChanged(n=>{n?F.collection("manager").doc(n.uid).get().then(o=>{s(o.data().FullName)}):s(null)})},[]),t}const f=z(),{isLoaded:v}=re({googleMapsApiKey:"AIzaSyDWW3NiTjdfwhcLPFux_oOEhfped_Qs3EA",libraries:["places"]}),B={lat:5.839398,lng:-55.199089};e.exports.useState(null);const[h,x]=e.exports.useState(""),[g,N]=e.exports.useState(""),[S,R]=e.exports.useState(null);let i=e.exports.useRef(),l=e.exports.useRef();async function W(){if(l.current.value===""||i.current.value==="")return;const s=await new google.maps.DirectionsService().route({origin:l.current.value,destination:i.current.value,travelMode:google.maps.TravelMode.DRIVING});R(s),x(s.routes[0].legs[0].distance.text),N(s.routes[0].legs[0].duration.text),M(l.current.value),L(i.current.value)}const[_,q]=e.exports.useState([]);U(),e.exports.useEffect(()=>{(async()=>{const s=u(c,"drivers"),n=U(s,te("timestamp","desc"));m(n,o=>{q(o.docs.map(G=>({...G.data(),id:G.id})))})})()},[]);const[ce,K]=e.exports.useState([]);e.exports.useEffect(()=>{(async()=>{const s=u(c,"place");m(s,n=>{K(n.docs.map(o=>({...o.data(),id:o.id})))})})()},[]);const[C,O]=e.exports.useState([]);e.exports.useEffect(()=>{(async()=>{const s=u(c,"place");m(s,n=>{O(n.docs.map(o=>({...o.data(),id:o.id})))})})()},[]),e.exports.useState([]);const[ue,P]=e.exports.useState(""),H=()=>C.map((t,s)=>a("div",{children:[a("h2",{onClick:()=>{P(t.id)},children:[t.number," "]}),r("button",{onClick:n=>{V(j(c,"place",t.id))},children:" remove    "})]},s)),[b,J]=e.exports.useState(""),[D,A]=e.exports.useState(""),[y,k]=e.exports.useState(),[E,M]=e.exports.useState(""),[w,L]=e.exports.useState(""),X=()=>{const t=e.exports.useRef();l=e.exports.useRef();const s={componentRestrictions:{country:"sr"}};return e.exports.useEffect(()=>{t.current=new window.google.maps.places.Autocomplete(l.current,s)},[]),a("div",{className:"displayflex",children:[r("input",{type:"text",className:"client-input",placeholder:"Enter Name",onMouseLeave:n=>A(n.target.value),defaultValue:D}),r("input",{type:"number",className:"client-input",placeholder:"Enter Number",onMouseLeave:n=>k(n.target.value),defaultValue:y}),r("input",{id:"input",className:"client-input",type:"text",placeholder:"from",defaultValue:E,ref:l,onBlur:n=>M(n.target.value)})]})},Y=()=>{const t=e.exports.useRef();i=e.exports.useRef();const s={componentRestrictions:{country:"sr"}};return e.exports.useEffect(()=>{t.current=new window.google.maps.places.Autocomplete(i.current,s)},[]),a("div",{children:[r("input",{type:"text",className:"client-input",placeholder:"to",ref:i,defaultValue:w,onBlur:n=>L(n.target.value)}),r("input",{type:"text",className:"client-input",placeholder:"driver number",defaultValue:b,onMouseLeave:n=>J(n.target.value)})]})};function Z(){R(null),x(""),N(""),A(""),k(""),l.current.value="",i.current.value=""}function $(){const t=u(c,"drivers");se(t,{name:D,start:E,end:w,distance:h,duration:g,number:y,client:I,status:"Awaiting driver",ndriver:Number(b),timestamp:ne()})}if(!v)return r("div",{children:" loading .... "});if(v&&f||d)return r(ee,{children:a("div",{className:"admin-side",children:[r(ae,{admin:d,manager:f}),a("div",{className:"split",children:[r("div",{className:"rides",children:r("div",{className:"admin-see",children:a("form",{className:"form-admin",onClick:t=>t.preventDefault(),children:[r(X,{}),r(Y,{}),r("button",{onClick:W,children:" Check distance "}),r("button",{onClick:$,children:" send to driver "}),r("button",{onClick:Z,children:" del route "}),_.map((t,s)=>a("div",{className:"divclientstatus",children:[a("p",{children:[" status : ",t.status]}),a("p",{children:[" client name : ",t.name," "]}),r("button",{onClick:()=>{V(j(c,"drivers",t.id))},children:" remove ride "})]})),a("div",{className:"client-span",children:[a("p",{children:["Distance: ",h]}),a("p",{children:[" Duration:",g]})]})]})})}),a("div",{className:"map-and-markers",children:[a(oe,{id:"map",zoom:12,center:B,mapContainerClassName:"map-container",children:[C.map((t,s)=>r(ie,{position:{lat:t.lat,lng:t.lng},label:"yello"},s)),S&&r(le,{directions:S})]}),r("div",{className:"driverLocal",children:r(H,{})})]})]})]})});if(!d)return null}export{me as default};
