import { Controller, Get } from '@nestjs/common';
import { loadConfig } from '../config/config.service.js';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return { ok: true };
  }

  @Get('models')
  models() {
    const cfg = loadConfig();
    return {
      openai: {
        chatModel: cfg.openai.chatModel,
        imageModel: cfg.openai.imageModel,
        hasKey: !!cfg.openai.apiKey,
      },
      runway: {
        videoModel: cfg.runway.videoModel,
        hasKey: !!cfg.runway.apiKey,
      },
      galleryRoot: cfg.galleryRoot,
    };
  }
}
