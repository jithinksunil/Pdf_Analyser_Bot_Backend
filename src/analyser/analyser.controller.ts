import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnalyserService } from './analyser.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { GetAnswerDto } from './dto/getAnswer.dto';

@UseGuards(AuthGuard)
@Controller('analyser')
export class AnalyserController {
  constructor(private analyserService: AnalyserService) {}
  @Post('/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  getAnswer(
    @Body() body: GetAnswerDto,
    @Headers('authorization') accessToken: string,
    @Param('id') fileId: string,
  ) {
    return this.analyserService.getAnswer(fileId, body.question, accessToken);
  }
}
