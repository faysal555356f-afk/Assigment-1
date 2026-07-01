const jobs = [
  {id:1, company:"Google", position:"Frontend Dev", location:"Remote", type:"Full-time", salary:"$3000", desc:"Build UI systems"},
  {id:2, company:"Meta", position:"Backend Dev", location:"USA", type:"Full-time", salary:"$4000", desc:"API Development"},
  {id:3, company:"Amazon", position:"DevOps", location:"Canada", type:"Full-time", salary:"$3500", desc:"Cloud system"},
  {id:4, company:"Tesla", position:"Engineer", location:"Germany", type:"Full-time", salary:"$4500", desc:"Automation"},
  {id:5, company:"Netflix", position:"UI Designer", location:"Remote", type:"Part-time", salary:"$2500", desc:"Design UI"},
  {id:6, company:"Apple", position:"iOS Dev", location:"USA", type:"Full-time", salary:"$5000", desc:"App development"},
  {id:7, company:"Spotify", position:"Data Analyst", location:"Sweden", type:"Remote", salary:"$3200", desc:"Data insights"},
  {id:8, company:"Microsoft", position:"AI Engineer", location:"UK", type:"Full-time", salary:"$6000", desc:"AI models"}
];

let interview = [];
let rejected = [];
let currentTab = "all";

const container = document.getElementById("jobContainer");

function updateCounts() {
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText = interview.length;
  document.getElementById("rejectedCount").innerText = rejected.length;

  if(currentTab==="all") document.getElementById("tabCount").innerText = jobs.length;
  if(currentTab==="interview") document.getElementById("tabCount").innerText = interview.length;
  if(currentTab==="rejected") document.getElementById("tabCount").innerText = rejected.length;
}

function render() {
  container.innerHTML = "";

  let data = [];
  if(currentTab==="all") data = jobs;
  if(currentTab==="interview") data = interview;
  if(currentTab==="rejected") data = rejected;

  if(data.length === 0){
    container.innerHTML = `
      <div class="empty">
        <h3>No jobs Available</h3>
        <p>Please add jobs</p>
      </div>
    `;
    return;
  }

  data.forEach(job=>{
    const card = document.createElement("div");
    card.className="card";

    card.innerHTML = `
      <h3>${job.company}</h3>
      <p>${job.position}</p>
      <p>${job.location}</p>
      <p>${job.type}</p>
      <p>${job.salary}</p>
      <p>${job.desc}</p>
      <div class="buttons">
        <button onclick="handleInterview(${job.id})">Interview</button>
        <button onclick="handleRejected(${job.id})">Rejected</button>
        <button onclick="deleteJob(${job.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function handleInterview(id){
  const job = jobs.find(j=>j.id===id);
  if(!interview.includes(job)){
    interview.push(job);
    rejected = rejected.filter(j=>j.id!==id);
  }
  render(); updateCounts();
}

function handleRejected(id){
  const job = jobs.find(j=>j.id===id);
  if(!rejected.includes(job)){
    rejected.push(job);
    interview = interview.filter(j=>j.id!==id);
  }
  render(); updateCounts();
}

function deleteJob(id){
  const index = jobs.findIndex(j=>j.id===id);
  jobs.splice(index,1);
  interview = interview.filter(j=>j.id!==id);
  rejected = rejected.filter(j=>j.id!==id);
  render(); updateCounts();
}

document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    render(); updateCounts();
  });
});

render();
updateCounts();