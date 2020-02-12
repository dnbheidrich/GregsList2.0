import Job from "../Models/Job.js"
import store from "../store.js"




// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 3000
});


class JobService {
  getJob(){
    _api.get("").then(res => {
      let jobs = res.data.data.map(j => new Job(j));
      store.commit("jobs", jobs);
      
    })
    .catch(e => {
      console.log(e);
      
    })
  
}
getJobById(id){
  _api.get(id)
}

addJob(newjob){
  _api.post("", newjob).then(res =>{
    let newjob = new Job(res.data.data);
    let jobs = [...store.State.jobs, newjob];
    store.commit("jobs", jobs)

  })
}

editJob(id, update){
  _api.put(id, update).then(res =>{
    let job = store.State.jobs.find(j => j._id == id);
    // couldnt get spread op to work for me
    // job = {...job, ...update};
    for (let prop in update) {
      job[prop] = update[prop];
    }
    store.commit("jobs", store.State.jobs);
    
  }) .catch(error => {
  console.error(error);
 });

  
}


deleteJob(id){
  _api.delete(id).then(() =>{
    let jobs = store.State.jobs.filter(j => j._id !=id);
    store.commit("jobs", jobs)
  })
  
}
  constructor(){}
}

const service = new JobService();
export default service