import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"

export function World() {
  console.log("World Loaded!")

  const world = useGLTF("/models/world.glb")

  const { gl } = useThree()

  const light0Position = world.scene.getObjectByName("Light0Ref").position
  const light1Position = world.scene.getObjectByName("Light1Ref").position
  const light2Position = world.scene.getObjectByName("Light2Ref").position

  const light0Intensity = 1
  const light1Intensity = 1
  const light2Intensity = 10

  for (let child of world.scene.children) {
    if (child.isMesh && child.material.map) {
      child.material.map.anisotropy = gl.capabilities.getMaxAnisotropy()

      child.material.envMapIntensity = 0.6
    }

    if (child.isMesh) {
      child.receiveShadow = true
      child.castShadow = true
    }
  }

  return (
    <>
      <Environment background files={"/images/scene2.hdr"} />

      {/* Light0 */}
      <pointLight
        position={light0Position}
        intensity={light0Intensity}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
        // decay={1.5}
      />
      <pointLight
        position={[light0Position.x + 0.5, light0Position.y, light0Position.z]}
        intensity={light0Intensity}
        color="#C8F8FF"
        // decay={1.5}
      />
      <pointLight
        position={[light0Position.x - 0.5, light0Position.y, light0Position.z]}
        intensity={light0Intensity}
        color="#C8F8FF"
        // decay={1.5}
      />

      {/* Light1 */}
      {/* <pointLight
        position={light1Position}
        intensity={5}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
      />
      <pointLight
        position={[light1Position.x, light1Position.y, light1Position.z + 1]}
        intensity={5}
        color="#C8F8FF"
      />
      <pointLight
        position={[light1Position.x, light1Position.y, light1Position.z - 1]}
        intensity={5}
        color="#C8F8FF"
      /> */}

      {/* Light2 */}
      <pointLight
        position={light2Position}
        intensity={light2Intensity}
        color="#C8F8FF"
        castShadow
        shadow-normalBias={0.04}
      />
      <pointLight
        position={[light2Position.x + 0.9, light2Position.y, light2Position.z]}
        intensity={light2Intensity * 0.25}
        color="#C8F8FF"
      />
      <pointLight
        position={[light2Position.x - 0.9, light2Position.y, light2Position.z]}
        intensity={light2Intensity * 0.25}
        color="#C8F8FF"
      />

      <ambientLight intensity={0.1} color={"#60B2F1"} />

      <primitive object={world.scene} />
    </>
  )
}
