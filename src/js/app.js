import "../styles/styles.css";
import { animCubeOfCubes, getCubeOfCubes, getCubePoint } from "./objects";
import Viewer from "./viewer";

export default class App {
  constructor() {
    this.viewer = new Viewer();
    this.cubeOfCubes = getCubeOfCubes(this.viewer, 10, 10, 0.15);
    this.cubePoint = getCubePoint(this.viewer, 0.4);
    animCubeOfCubes(this.viewer, this.cubeOfCubes, this.cubePoint);
  }
}
