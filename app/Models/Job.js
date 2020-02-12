export default class Job{
  constructor(data){
  this._id = data._id,
  this.company = data.company,
  this.jobTitle = data.jobTitle
  this.rate = data.rate
  this.hours = data.hours
  this.description = data.description
}

get Template(){
  return `
            <div class="col-12 col-md-3">
            <div class="card">
            <div class="card-body">
              <h5
               class="card-title">Company: ${this.company} - Title: ${this.jobTitle} - Hours: ${this.hours}
              </h5>
              <p class="card-text">${this.description} <b>$${this.rate}</b>
              </p>
              <button class="btn btn-danger" onclick="app.jobController.delete('${
                this._id
              }')">DELETE</button>
            </div>
          </div>
            </div>
    `;
}
}