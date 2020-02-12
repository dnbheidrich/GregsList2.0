import CarsController from "./Controllers/CarsController.js";
import HouseController from "./Controllers/HouseController.js";
import JobController from "./Controllers/JobController.js";

class App {
  carsController = new CarsController();
  houseController = new HouseController();
  jobController = new JobController
}

window["app"] = new App();
