import * as THREE from "three"
import { useThree, useFrame } from "@react-three/fiber"
import dustVertexShader from "../shaders/dust/vertex.glsl?raw"
import dustFragmentShader from "../shaders/dust/fragment.glsl?raw"

export function Dust() {
  const { scene } = useThree()

  const dustCount = 500

  const dustGeometry = new THREE.BufferGeometry()

  const positions = []
  const positionVectors = []
  const randoms = new Float32Array(dustCount)

  const n = 2,
    n2 = n / 2 // particles spread in the sphere + put sphere in center

  for (let i = 0; i < dustCount; i++) {
    // positions
    const x = Math.random() * n - n2
    const y = Math.random() * n - n2
    const z = Math.random() * n - n2

    positionVectors.push(new THREE.Vector3(x, y, z))

    if (positionVectors[i].distanceTo(new THREE.Vector3(0, 0, 0)) < n / 2) {
      positions.push(x, y, z)
      randoms[i] = Math.random()
    }
  }

  dustGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  )
  dustGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))

  dustGeometry.computeBoundingSphere()

  const dustMaterial = new THREE.ShaderMaterial({
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,

    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor1: {
        value: new THREE.Color("orange"),
      },
      uColor2: {
        value: new THREE.Color("red"),
      },
    },
  })

  const dustPoints = new THREE.Points(dustGeometry, dustMaterial)
  scene.add(dustPoints)

  useFrame((state, delta) => {
    dustMaterial.uniforms.uTime.value += delta
  })

  return <></>
}
