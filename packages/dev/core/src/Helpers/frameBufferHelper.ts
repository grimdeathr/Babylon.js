
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import { Engine } from "../Engines/engine";
import type { Scene } from "../scene";

/**
 *
 */
export class FrameBufferHelper {
  /**
   *
   */
  texture: RenderTargetTexture;

  async copyFramebufferToTexture(engine: Engine, scene: Scene) {
    if(!this.texture) {
      // Create a render target texture
      this.texture = new RenderTargetTexture("framebufferTexture", {
        width: engine.getRenderWidth(),
        height: engine.getRenderHeight()
      }, scene, false, false, Engine.TEXTURETYPE_UNSIGNED_INT);
    }
    engine._gl.bindFramebuffer(engine._gl.FRAMEBUFFER, engine._currentFramebuffer);
    const { FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D } = engine._gl;
    engine._gl.framebufferTexture2D( FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, this.texture, 0);
    return this.texture;
  }
}
