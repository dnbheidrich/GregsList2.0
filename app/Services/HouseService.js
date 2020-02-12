import House from "../Models/House.js"
import store from "../store.js"



// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/houses",
  timeout: 3000
});

class HouseService{
    getHouse(){
        _api.get("").then(res => {
          let houses = res.data.data.map(h => new House(h));
          store.commit("houses", houses);
          
        })
        .catch(e => {
          console.log(e);
          
        })
      
    }
    getHouseById(id){
      _api.get(id)
    }

    addHouse(newHouse){
      _api.post("", newHouse).then(res =>{
        let newHouse = new House(res.data.data);
        let houses = [...store.State.houses, newHouse];
        store.commit("houses", houses)

      })
    }

    editHouse(id, update){
      _api.put(id, update).then(res =>{
        let house = store.State.houses.find(h => h._id == id);
        // couldnt get spread op to work for me
        // house = {...house, ...update};
        for (let prop in update) {
          house[prop] = update[prop];
        }
        store.commit("houses", store.State.houses);
        
      }) .catch(error => {
      console.error(error);
     });

      
    }


    deleteHouse(id){
      _api.delete(id).then(() =>{
        let houses = store.State.houses.filter(h => h._id !=id);
        store.commit("houses", houses)
      })
      
    }
  
}


const service = new HouseService();
export default service;