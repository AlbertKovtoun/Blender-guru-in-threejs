import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import {
  useGLTF,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei"

export function World() {
  console.log("World Loaded!")

  const world = useGLTF("/models/world.glb")

  const { gl } = useThree()

  const light0Position = world.scene.getObjectByName("Light0Ref").position
  const light1Position = world.scene.getObjectByName("Light1Ref").position
  const light2Position = world.scene.getObjectByName("Light2Ref").position

  for (let child of world.scene.children) {
    if (child.isMesh && child.material.map) {
      child.material.map.anisotropy = gl.capabilities.getMaxAnisotropy()
    }

    if (child.isMesh) {
      child.receiveShadow = true
      child.castShadow = true
    }
  }

  return (
    <>
      <Environment background files={"/images/scene2.hdr"} />

      <pointLight
        position={light0Position}
        intensity={10}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
      />

      <pointLight
        position={light1Position}
        intensity={10}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
      />

      <pointLight
        position={light2Position}
        intensity={20}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
      />

      <ambientLight intensity={0.1} color={"#60B2F1"} />

      <primitive object={world.scene} />
    </>
  )
}
