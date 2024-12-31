import * as THREE from "three"
import { camera } from "./Experience"

export class Sounds {
  constructor() {}

  setSound() {
    const listener = new THREE.AudioListener()
    camera.camera.add(listener)

    const sound = new THREE.Audio(listener)

    const audioLoader = new THREE.AudioLoader()
    audioLoader.load("sounds/sound.mp3", (buffer) => {
      sound.setBuffer(buffer)
      sound.setVolume(0.4)
      sound.play()
    })

    setInterval(() => {
      sound.play()
    }, 10000)
  }
}
