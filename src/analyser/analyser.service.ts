import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AnalyserService {
  constructor(private commonService: CommonService) {}
  async getAnswer(fileId: string, question: string, accessToken: string) {
    const extractedText = await this.commonService.extractFromFile(
      fileId,
      accessToken,
    );
    return await this.commonService.analyseWithAi(extractedText, question);
  }
}
