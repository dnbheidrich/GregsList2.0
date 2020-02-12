import store from "../store.js"
import HouseService from "../Services/HouseService.js"

//Private
function _draw() {
  let houses = store.State.houses;
  let houseElem = document.getElementById("house");
  let template = "";

  houses.forEach(houses => {
    template += houses.Template;
  });

  houseElem.innerHTML = template;
}

//Public
export default class HouseController{
  constructor(){
    store.subscribe("houses", _draw);
    this.getAllHouses();
  }
  getAllHouses(){
    HouseService.getHouse();
  }
  removeImg(id) {
    debugger;
    HouseService.editHouse(id, { imgUrl: "//placehold.it/200x200" });
  }


  bid(id, price) {
    debugger
    HouseService.editHouse(id, { price });
  }
  delete(id){
    HouseService.deleteHouse(id);
  }
  addHouse(event) {
    event.preventDefault();
    let formData = event.target;
    let newHouse = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      imgUrl: formData.imgUrl.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
      description: formData.description.value,
    };
    console.log(newHouse);
    HouseService.addHouse(newHouse);
    formData.reset();
    // @ts-ignore
    $("#house-form").modal("toggle");
  }
}