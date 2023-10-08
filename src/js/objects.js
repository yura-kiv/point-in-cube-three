import * as THREE from "three";
import { mapRange } from "./helpers/calculation";
import { lerp } from "three/src/math/MathUtils";

const startColor = new THREE.Color(0x505050);
const endColor = new THREE.Color(0xffffff);

export const getCube = (size) => {
  const geomerty = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhysicalMaterial({ color: startColor });
  const cube = new THREE.Mesh(geomerty, material);
  return cube;
};

export const getCubeOfCubes = (viewer, size, space, cubeSize) => {
  const cubesArr = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        const x = mapRange(i, 0, size - 1, -space, space);
        const y = mapRange(j, 0, size - 1, -space, space);
        const z = mapRange(k, 0, size - 1, -space, space);
        const cube = getCube(cubeSize);
        cube.position.set(x, y, z);
        cubesArr.push({
          mesh: cube,
          currentCoordinates: new THREE.Vector3(x, y, z),
          originalCoordinates: new THREE.Vector3(x, y, z),
        });
        viewer.scene.add(cube);
      }
    }
  }
  console.log(cubesArr[0].mesh);
  return cubesArr;
};

export const getCubePoint = (viewer, radius) => {
  const geomerty = new THREE.SphereGeometry(radius, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cubePoint = new THREE.Mesh(geomerty, material);
  viewer.scene.add(cubePoint);
  viewer.addUpdateAction("point_lissajous", () => {
    cubePoint.position.set(
      Math.sin(viewer.clock.elapsedTime * 1.5) * 9,
      Math.cos(viewer.clock.elapsedTime * 0.8) * 9,
      Math.sin(viewer.clock.elapsedTime * 1.3) * 9
    );
  });
  return cubePoint;
};

export const animCubeOfCubes = (viewer, cubes, point) => {
  viewer.addUpdateAction("force_cubes", () => {
    cubes.forEach((cube) => {
      const force = cube.originalCoordinates.clone().sub(point.position);
      const distance = force.length() / 2;
      const forceFactor = 1 / Math.max(distance, 1);
      const newPosition = cube.originalCoordinates
        .clone()
        .add(force.normalize().multiplyScalar(forceFactor * 3));
      cube.mesh.rotation.y = Math.PI * forceFactor;
      cube.mesh.rotation.z = Math.PI * forceFactor;
      const scale = lerp(1, 4, forceFactor * 2);
      cube.mesh.scale.setScalar(scale);
      cube.mesh.position.copy(newPosition);
      const interpolatedColor = startColor.clone().lerp(endColor, forceFactor * 3);
      cube.mesh.material.color.set(interpolatedColor);
    });
  });
};
