import * as THREE from "three"
import { useThree, useFrame } from "@react-three/fiber"
import dustVertexShader from "../shaders/dust/vertex.glsl?raw"
import dustFragmentShader from "../shaders/dust/fragment.glsl?raw"

export function Dust() {
  const { scene } = useThree()

  const dustCount = 100

  const dustGeometry = new THREE.BufferGeometry()

  const dustPositions = new Float32Array(dustCount * 3)

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3 + 0] = Math.random() * 4
    dustPositions[i * 3 + 1] = Math.random() * 4
    dustPositions[i * 3 + 2] = Math.random() * 4
  }

  dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(dustPositions, 3)
  )

  const dustMaterial = new THREE.ShaderMaterial({
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    // transparent: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending,

    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uTime: { value: 0 },
    },
  })

  const dust = new THREE.Points(dustGeometry, dustMaterial)
  scene.add(dust)

  useFrame((state, delta) => {
    dustMaterial.uniforms.uTime.value += delta
  })

  return <></>
}
