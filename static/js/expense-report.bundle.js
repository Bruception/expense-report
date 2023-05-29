(()=>{"use strict";var e={545:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculateExpenseReport=void 0,t.calculateExpenseReport=(e,t)=>{const n=t.contributions.map((t=>{const n=e[t.name],a=n?parseFloat(n):0;return{...t,amount:a}})).filter((e=>e.amount>0)),a={};return t.contributors.forEach((e=>{a[e.name]={expenses:[],total:0}})),t.expenseRecord.forEach((e=>{const t=e.contributions.reduce(((e,t)=>{const a=n.find((e=>e.name===t));return e+(a?.amount||0)}),0);e.expenses.forEach((n=>{const r=((e,t)=>(e=>void 0!==e.percentage)(e)?((e,t)=>e.percentage*t/100)(e,t):(e=>void 0!==e.amount)(e)?(e=>e.amount)(e):0)(n,t),o={payee:n.payee,amount:r,items:[...e.contributions]};a[n.payer].expenses.push(o),a[n.payer].total+=r}))})),Object.entries(a).forEach((e=>{let[t,n]=e;const a={};n.expenses.forEach((e=>{a[e.payee]?(a[e.payee].amount+=e.amount,a[e.payee].items.push(...e.items)):a[e.payee]={...e}})),n.expenses=Object.values(a),n.expenses.forEach((e=>{e.amount=e.amount})),n.total=n.total})),a}},863:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config={contributions:[{name:"Rent"},{name:"Light"},{name:"Water"},{name:"Cable"},{name:"Garbage"},{name:"Bank Fee"}],contributors:[{name:"Bruce Berrios"},{name:"Leandra Berrios"},{name:"Hazel Corrales"},{name:"Manuel Berrios"},{name:"Isamara Berrios"}],expenseRecord:[{contributions:["Rent","Bank Fee"],expenses:[{payer:"Bruce Berrios",percentage:30.3,payee:"Leandra Berrios"},{payer:"Leandra Berrios",percentage:20,payee:"Leandra Berrios"},{payer:"Hazel Corrales",percentage:11.7,payee:"Leandra Berrios"},{payer:"Manuel Berrios",percentage:11.7,payee:"Leandra Berrios"},{payer:"Isamara Berrios",percentage:26.3,payee:"Leandra Berrios"}]},{contributions:["Light","Water","Garbage"],expenses:[{payer:"Bruce Berrios",percentage:25,payee:"Leandra Berrios"},{payer:"Hazel Corrales",percentage:25,payee:"Leandra Berrios"},{payer:"Manuel Berrios",percentage:25,payee:"Leandra Berrios"},{payer:"Isamara Berrios",percentage:25,payee:"Leandra Berrios"}]},{contributions:["Cable"],expenses:[{payer:"Bruce Berrios",percentage:25,payee:"Hazel Corrales"},{payer:"Hazel Corrales",percentage:25,payee:"Hazel Corrales"},{payer:"Manuel Berrios",percentage:25,payee:"Hazel Corrales"},{payer:"Isamara Berrios",percentage:25,payee:"Hazel Corrales"}]}]}},890:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,r)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.generateUI=t.generateExpenseReport=void 0;const c=o(n(895)),s=n(545);t.generateExpenseReport=e=>{const t=document.getElementById("expense-report");t.innerHTML="";const n=document.createElement("h3");n.id="report-total",n.textContent=`Total For This Month: $${Object.values(e).reduce(((e,t)=>e+t.total),0).toFixed(2)}`,t.appendChild(n);const a=document.createElement("h2");a.textContent="Breakdown",t.appendChild(a);const r=document.createElement("hr");t.appendChild(r),Object.entries(e).forEach((e=>{let[n,a]=e;const r=document.createElement("div");r.className="contributor-container";const o=document.createElement("h3");o.textContent=n,r.appendChild(o),a.expenses.forEach((e=>{const t=document.createElement("div");t.className="expense-item";const n=document.createElement("span");n.textContent=`Pay To: ${e.payee} `,t.appendChild(n);const a=document.createElement("div");a.textContent=`Amount: $${e.amount.toFixed(2)}`,t.appendChild(a);const o=document.createElement("span");o.textContent="For: ",t.appendChild(o);const c=document.createElement("ul");e.items.forEach((e=>{const t=document.createElement("li");t.textContent=e,c.appendChild(t)})),t.appendChild(c),r.appendChild(t)}));const c=document.createElement("div");c.className="total",c.textContent=`Total: $${a.total.toFixed(2)}`,r.appendChild(c),r.appendChild(document.createElement("hr")),t.appendChild(r)}))},t.generateUI=e=>{const n=document.getElementById("root");if(!n)return;const{contributions:a}=e,r=document.createElement("form");r.id="contribution-form";const o=document.createElement("div");o.id="expense-report",a.forEach((n=>{const a=document.createElement("div");a.classList.add("contribution-group");const o=document.createElement("label");o.textContent=n.name,a.appendChild(o);const i=document.createElement("input");i.type="number",i.name=n.name,i.setAttribute("min","0"),i.setAttribute("step","0.01"),i.placeholder="Enter amount",a.appendChild(i),i.addEventListener("input",(a=>{a.preventDefault();const o=new FormData(r),p=Object.fromEntries(o.entries()),d=c.base64URLEncode(JSON.stringify(p));window.history.replaceState({},"",`?contributions=${d}`),p[n.name]=i.value;const l=(0,s.calculateExpenseReport)(p,e);(0,t.generateExpenseReport)(l)})),r.appendChild(a)})),n.appendChild(r),n.appendChild(o),(e=>{const n=new URLSearchParams(window.location.search).get("contributions");if(n){const a=JSON.parse(c.base64URLDecode(n)),r=document.getElementById("contribution-form");if(r){const n=new FormData(r),o={...Object.fromEntries(n.entries()),...a};Object.entries(o).forEach((e=>{let[t,n]=e;const a=document.querySelector(`input[name="${t}"]`);a&&(a.value=n)}));const c=(0,s.calculateExpenseReport)(o,e);(0,t.generateExpenseReport)(c)}}})(e)}},895:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.base64URLDecode=t.base64URLEncode=void 0,t.base64URLEncode=e=>encodeURIComponent(btoa(e)),t.base64URLDecode=e=>atob(decodeURIComponent(e))}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}(()=>{const e=n(890),t=n(863);window.onload=()=>{(0,e.generateUI)(t.config)}})()})();