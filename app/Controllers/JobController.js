import store from "../store.js"
import JobService from "../Services/JobService.js"



//Private
function _draw() {
  let jobs = store.State.jobs;
  let jobElem = document.getElementById("job");
  let template = "";

  jobs.forEach(jobs => {
    template += jobs.Template;
  });

  jobElem.innerHTML = template;
}

//Public
export default class JobController{
  constructor(){
    store.subscribe("jobs", _draw);
    this.getAllJobs();
  }
  getAllJobs(){
    JobService.getJob();
  }
  removeImg(id) {
    debugger;
    JobService.editJob(id, { imgUrl: "//placehold.it/200x200" });
  }


  bid(id, price) {
    debugger
   JobService.editJob(id, { price });
  }
  delete(id){
   JobService.deleteJob(id);
  }
  addJob(event) {
    event.preventDefault();
    let formData = event.target;
    let newJob = {
      // _id : formData._id.value,
      company : formData.company.value,
      jobTitle : formData.jobTitle.value,
      rate : formData.rate.value,
      hours : formData.hours.value,
      description : formData.description.value
      
    };
    console.log(newJob);
   JobService.addJob(newJob);
    formData.reset();
    // @ts-ignore
    $("#job-form").modal("toggle");
  }
}