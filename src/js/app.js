import "../styles/styles.css";
import { animCubeOfSpheres, getCubeOfCubes, getCubePoint } from "./objects";
import Viewer from "./viewer";

export default class App {
  constructor() {
    this.viewer = new Viewer();
    this.cubeOfSpheres = getCubeOfCubes(this.viewer, 10, 9, 0.2);
    this.cubePoint = getCubePoint(this.viewer, 0.4);
    animCubeOfSpheres(this.viewer, this.cubeOfSpheres, this.cubePoint);
  }
}
