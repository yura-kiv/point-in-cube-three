import * as THREE from "three";
import { mapRange } from "./helpers/calculation";
import { lerp } from "three/src/math/MathUtils";
import { colors } from "./assets/colors";

export const getCube = (size) => {
  const random = Math.floor(Math.random() * 6);
  const geomerty = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhysicalMaterial({ color: colors[random] });
  const cube = new THREE.Mesh(geomerty, material);
  return cube;
};

export const getCubeOfCubes = (viewer, size, space, cubeSize) => {
  const spheresArr = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        const x = mapRange(i, 0, size - 1, -space, space);
        const y = mapRange(j, 0, size - 1, -space, space);
        const z = mapRange(k, 0, size - 1, -space, space);
        const sphere = getCube(cubeSize);
        sphere.position.set(x, y, z);
        spheresArr.push({
          mesh: sphere,
          currentCoordinates: new THREE.Vector3(x, y, z),
          originalCoordinates: new THREE.Vector3(x, y, z),
        });
        viewer.scene.add(sphere);
      }
    }
  }
  return spheresArr;
};

export const getCubePoint = (viewer, radius) => {
  const geomerty = new THREE.SphereGeometry(radius, 10, 10);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
  });
  const cubePoint = new THREE.Mesh(geomerty, material);
  viewer.scene.add(cubePoint);
  viewer.addUpdateAction("point_lissajous", () => {
    cubePoint.position.set(
      Math.sin(viewer.clock.elapsedTime * 1.2) * 8,
      Math.cos(viewer.clock.elapsedTime * 2.5) * 8,
      Math.sin(viewer.clock.elapsedTime * 1.5) * 8
    );
  });
  return cubePoint;
};

export const animCubeOfSpheres = (viewer, spheres, point) => {
  viewer.addUpdateAction("force_spheres", () => {
    spheres.forEach((sphere) => {
      const force = sphere.originalCoordinates.clone().sub(point.position);
      const distance = force.length() / 2;
      const forceFactor = (1 / Math.max(distance, 1)) * 2;
      const newPosition = sphere.originalCoordinates
        .clone()
        .add(force.normalize().multiplyScalar(forceFactor));
      sphere.mesh.rotation.y = (Math.PI * forceFactor) / 2;
      sphere.mesh.rotation.z = (Math.PI * forceFactor) / 2;
      const scale = lerp(1, 3, forceFactor);
      sphere.mesh.scale.setScalar(scale);
      sphere.mesh.position.copy(newPosition);
    });
  });
};
