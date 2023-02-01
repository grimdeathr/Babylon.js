
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import { Engine } from "../Engines/engine";
import { Scene } from "../scene";
import { RawTexture, Texture } from "..";

export class FrameBufferHelper {
  texture: RenderTargetTexture;
  async copyFramebufferToTexture(engine: Engine, scene: Scene) {
    if(!this.texture) {
      // Create a render target texture
      this.texture = new RenderTargetTexture("framebufferTexture", {
        width: engine.getRenderWidth(),
        height: engine.getRenderHeight()
      }, scene, false, false, Engine.TEXTURETYPE_UNSIGNED_INT);
    }
    //copy to existing variable
    let bufferView = await engine.readPixels(0, 0, engine.getRenderWidth(), engine.getRenderHeight());

    let t = new RawTexture(bufferView, engine.getRenderWidth(), engine.getRenderHeight(), Engine.TEXTUREFORMAT_R, scene, false, false, Texture.TRILINEAR_SAMPLINGMODE)
    this.texture._buffer = bufferView;
    // let t2  = new RenderTargetTexture()
    return this.texture;
  }
}
