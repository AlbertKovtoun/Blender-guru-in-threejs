import { Canvas } from "@react-three/fiber"
import { OrbitControls, CameraControls } from "@react-three/drei"
import { World } from "./World"
import { PostProcessing } from "./PostProcessing"

export function Experience() {
  return (
    <div className="webgl">
      <Canvas
        // flat
        shadows
        camera={{ position: [-2.53755, 0.941612, 9.79471], fov: 64.6 }}
      >
        <CameraControls makeDefault />

        <World />

        <PostProcessing />
      </Canvas>
    </div>
  )
}
