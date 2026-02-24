// MiniMax Usage Data (imported from user CSV)
const IMPORTED=[
{date:"2026-02-21",model:"MiniMax-M2.1",type:"chat",tokens:10565402,cost:3.19},
{date:"2026-02-21",model:"MiniMax-M2.1",type:"chat",tokens:1027820,cost:0.31},
{date:"2026-02-21",model:"MiniMax-M2.1",type:"chat",tokens:3108553,cost:0.94},
{date:"2026-02-20",model:"MiniMax-M2.1",type:"chat",tokens:2800000,cost:0.84},
{date:"2026-02-20",model:"MiniMax-M2.1",type:"research",tokens:5500000,cost:1.65},
{date:"2026-02-19",model:"MiniMax-M2.5",type:"chat",tokens:5000000,cost:2.47},
{date:"2026-02-18",model:"MiniMax-M2.1",type:"coding",tokens:8200000,cost:2.46},
{date:"2026-02-18",model:"MiniMax-M2.1",type:"chat",tokens:3500000,cost:1.05}
];
const PRICING={'MiniMax-M2.1':{in:0.2,out:0.2},'MiniMax-M2.5':{in:0.4,out:0.4},'GPT-4.1':{in:2,out:8}};
let logs=JSON.parse(localStorage.getItem('modelLogs')||'[]');
let events=JSON.parse(localStorage.getItem('mcevents')||'[]');
let tasks=JSON.parse(localStorage.getItem('mctasks')||'[]');
let reminders=JSON.parse(localStorage.getItem('mcreminders')||'[]');
let curFilter='all',curTask='all',curMo=new Date();
const allLogs=[...IMPORTED.map(d=>({...d,time:'12:00',input:d.tokens*0.6,output:d.tokens*0.4})),...logs];
function cost(l){return PRICING[l.model]?((l.input*PRICING[l.model].in+l.output*PRICING[l.model].out)/1e6):0}
function fmt(v){return'$'+v.toFixed(2)}
function td(){return new Date().toISOString().split('T')[0]}
function wAgo(){return new Date(Date.now()-7*864e5).toISOString().split('T')[0]}
function mAgo(){return new Date(Date.now()-30*864e5).toISOString().split('T')[0]}
function stats(){
const t=allLogs.filter(l=>l.date===td()).reduce((s,l)=>s+cost(l),0);
const w=allLogs.filter(l=>l.date>=wAgo()).reduce((s,l)=>s+cost(l),0);
const m=allLogs.filter(l=>l.date>=mAgo()).reduce((s,l)=>s+cost(l),0);
document.getElementById('costToday').innerText=fmt(t);
document.getElementById('costWeek').innerText=fmt(w);
document.getElementById('costMonth').innerText=fmt(m);
document.getElementById('uToday').innerText=fmt(t);
document.getElementById('uWeek').innerText=fmt(w);
document.getElementById('uMonth').innerText=fmt(m);
renderCharts();renderTable();renderCal();renderTasks();
}
function renderCharts(){
const mc={},tc={};
allLogs.forEach(l=>{mc[l.model]=(mc[l.model]||0)+cost(l);tc[l.type]=(tc[l.type]||0)+cost(l)});
if(window.costChart)window.costChart.destroy();
window.costChart=new Chart(document.getElementById('costChart'),{type:'line',data:{labels:Object.keys(mc),datasets:[{label:'Cost',data:Object.values(mc).map(v=>+v.toFixed(2)),borderColor:'#a855f7',fill:false,tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#2a2a3a'}},y:{grid:{color:'#2a2a3a'}}}}});
if(window.modelChart)window.modelChart.destroy();
window.modelChart=new Chart(document.getElementById('modelChart'),{type:'doughnut',data:{labels:Object.keys(mc),datasets:[{data:Object.values(mc),backgroundColor:['#a855f7','#3b82f6','#10b981','#f97316']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}});
if(window.usageModelChart)window.usageModelChart.destroy();
window.usageModelChart=new Chart(document.getElementById('usageModelChart'),{type:'pie',data:{labels:Object.keys(mc),datasets:[{data:Object.values(mc),backgroundColor:['#a855f7','#3b82f6','#10b981']}]},options:{responsive:true,maintainAspectRatio:false}});
if(window.usageTypeChart)window.usageTypeChart.destroy();
window.usageTypeChart=new Chart(document.getElementById('usageTypeChart'),{type:'bar',data:{labels:Object.keys(tc),datasets:[{data:Object.values(tc).map(v=>+v.toFixed(2)),backgroundColor:['#a855f7','#3b82f6','#10b981']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#2a2a3a'}},y:{grid:{color:'#2a2a3a'}}}}});
}
function renderTable(){
const f=curFilter==='all'?allLogs:allLogs.filter(l=>l.type===curFilter);
const s=f.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,15);
let h='';s.forEach(l=>{h+=`<tr><td>${l.date}</td><td>${l.model}</td><td><span class="tag tag_purple">${l.type}</span></td><td>${l.tokens?.toLocaleString()||'-'}</td><td style="color:var(--green)">${fmt(cost(l))}</td></tr>`});
document.getElementById('recentTable').innerHTML=h||'<tr><td colspan="5" style="text-align:center;color:#6b7280">No data</td></tr>';
document.getElementById('usageTable').innerHTML=h;
}
function renderCal(){
const m=curMo.getMonth(),y=curMo.getFullYear();
document.getElementById('calTitle').innerText=curMo.toLocaleString('default',{month:'long',year:'numeric'});
const fd=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(),today=new Date();
let h='';['S','M','T','W','T','F','S'].forEach(d=>h+=`<div class="cal_h">${d}</div>`);
for(let i=0;i<fd;i++)h+='<div></div>';
for(let d=1;d<=days;d++){
const isT=today.getDate()===d&&today.getMonth()===m&&today.getFullYear()===y;
const ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
const ev=events.filter(e=>e.date===ds);
let evh='';ev.forEach(e=>{evh+=`<div class="cal_event${e.color==='orange'?' orange':''}">${e.title}</div>`});
h+=`<div class="cal_day${isT?' today':''}"><div class="cal_num${isT?' today':''}">${d}</div>${evh}</div>`;
}
document.getElementById('calendarGrid').innerHTML=h;
const ue=events.filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,5);
let uh='';ue.forEach(e=>{uh+=`<div class="reminder_item"><div><div style="font-weight:500">${e.title}</div><div style="font-size:0.75rem;color:#6b7280">${e.date}${e.time?' '+e.time:''}</div></div><span class="tag tag_purple">${e.color}</span></div>`});
document.getElementById('upcomingEvents').innerHTML=uh||'<div style="padding:20px;text-align:center;color:#6b7280">No upcoming events</div>';
}
function changeMonth(d){curMo.setMonth(curMo.getMonth()+d);renderCal()}
function renderTasks(){
document.getElementById('taskCount').innerText=tasks.length;
document.getElementById('activeCount').innerText=tasks.filter(t=>!t.done).length;
const f=curTask==='all'?tasks:curTask==='active'?tasks.filter(t=>!t.done):tasks.filter(t=>t.done);
let h='';f.forEach((t,i)=>{h+=`<tr><td>${t.title}</td><td>${t.due||'-'}</td><td><span class="tag tag_${t.priority}">${t.priority}</span></td><td><button onclick="toggleTask(${i})" style="background:${t.done?'#10b981':'#3b82f6'};border:none;color:#fff;padding:4px 10px;border-radius:4px;cursor:pointer">${t.done?'✓':'○'}</button></td></tr>`});
document.getElementById('taskTable').innerHTML=h||'<tr><td colspan="4" style="text-align:center;color:#6b7280">No tasks</td></tr>';
}
function addLog(){const m=document.getElementById('logModel').value,t=document.getElementById('logType').value,inc=parseInt(document.getElementById('logIn').value)||0,outc=parseInt(document.getElementById('logOut').value)||0;logs.push({model:m,type:t,input:inc,output:outc,date:td(),time:new Date().toTimeString().slice(0,5)});localStorage.setItem('modelLogs',JSON.stringify(logs));closeModal('log');stats();document.getElementById('logIn').value='';document.getElementById('logOut').value=''}
function addEvent(){const t=document.getElementById('eventTitle').value,d=document.getElementById('eventDate').value,ti=document.getElementById('eventTime').value,c=document.getElementById('eventColor').value;if(!t||!d)return;events.push({title:t,date:d,time:ti,color:c});localStorage.setItem('mcevents',JSON.stringify(events));closeModal('event');renderCal();document.getElementById('eventTitle').value=''}
function addTask(){const t=document.getElementById('taskTitle').value,d=document.getElementById('taskDue').value,p=document.getElementById('taskPriority').value;if(!t)return;tasks.push({title:t,due:d,priority:p,done:false});localStorage.setItem('mctasks',JSON.stringify(tasks));closeModal('task');renderTasks();document.getElementById('taskTitle').value=''}
function toggleTask(i){tasks[i].done=!tasks[i].done;localStorage.setItem('mctasks',JSON.stringify(tasks));renderTasks()}
function openModal(m){document.getElementById('modal-'+m).classList.add('on')}
function closeModal(m){document.getElementById('modal-'+m).classList.remove('on')}
document.querySelectorAll('.nav_item').forEach(i=>{i.addEventListener('click',function(){document.querySelectorAll('.nav_item').forEach(n=>n.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));document.getElementById('panel-'+this.dataset.p).classList.add('active')})});
document.querySelectorAll('.filter').forEach(b=>{b.addEventListener('click',function(){document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));this.classList.add('active');curFilter=this.dataset.f;renderTable()})});
stats();
