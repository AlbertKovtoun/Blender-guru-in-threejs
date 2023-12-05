import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { world } from "./Experience"

export class Loaders {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {
      console.log("Loading complete!")

      world.setLights()
      world.setLightsFlickering()
      world.setDimensionFlickering()
    })

    this.textureLoader = new THREE.TextureLoader()

    this.gltfLoader = new GLTFLoader(this.loadingManager)

    this.rgbeLoader = new RGBELoader()
  }
}
