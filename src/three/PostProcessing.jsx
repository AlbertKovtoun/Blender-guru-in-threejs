import { EffectComposer, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

export function PostProcessing() {
  return (
    <>
      <EffectComposer disableNormalPass multisampling={0}></EffectComposer>
    </>
  )
}
