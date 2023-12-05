import * as THREE from "three"
import { loaders, renderer, scene } from "./Experience"

export class World {
  constructor() {
    this.loadModel()
  }

  getRandomBoolean() {
    return Math.random() > 0.5
  }

  loadModel() {
    loaders.gltfLoader.load("/models/world.glb", (gltf) => {
      this.world = gltf.scene

      for (let child of this.world.children) {
        if (child.isMesh && child.material.map) {
          child.material.map.anisotropy =
            renderer.renderer.capabilities.getMaxAnisotropy()

          child.material.envMapIntensity = 0.6
        }

        if (child.isMesh) {
          child.receiveShadow = true
          child.castShadow = true
        }
      }

      scene.add(this.world)
    })
  }

  setLights() {
    this.pointLightsColor = "#C8F8FF"

    this.pointLight0Intensity = 1
    this.pointLight1Intensity = 10

    this.pointLight0Position = this.world.getObjectByName("Light0Ref").position
    this.pointLight1Position = this.world.getObjectByName("Light2Ref").position

    //Light0
    this.pointLight0C = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0C.position.set(
      this.pointLight0Position.x,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )
    this.pointLight0C.castShadow = true
    this.pointLight0C.shadow.normalBias = 0.04

    this.pointLight0R = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0R.position.set(
      this.pointLight0Position.x + 0.5,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )

    this.pointLight0L = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0L.position.set(
      this.pointLight0Position.x - 0.5,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )

    //Light1
    this.pointLight1C = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity
    )
    this.pointLight1C.position.set(
      this.pointLight1Position.x,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )
    this.pointLight1C.castShadow = true
    this.pointLight1C.shadow.normalBias = 0.04

    this.pointLight1R = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity * 0.25
    )
    this.pointLight1R.position.set(
      this.pointLight1Position.x + 0.9,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )

    this.pointLight1L = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity * 0.25
    )
    this.pointLight1L.position.set(
      this.pointLight1Position.x - 0.9,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )

    scene.add(
      this.pointLight0C,
      this.pointLight0R,
      this.pointLight0L,
      this.pointLight1C,
      this.pointLight1R,
      this.pointLight1L
    )

    this.ambientLight = new THREE.AmbientLight("#60B2F1", 0.1)
    scene.add(this.ambientLight)
  }

  setLightsFlickering() {
    console.log(
      "The lights do be flickering tho. Ain't no way copilot just did that!@#!@#"
    )

    let isLightOn = this.getRandomBoolean()

    setInterval(() => {
      isLightOn = this.getRandomBoolean()
      console.log(isLightOn ? "Light is on" : "Light is off")
    }, Math.random() * 2000) // Change the boolean value every 0 to 2 seconds
  }
}
