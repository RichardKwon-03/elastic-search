// elasticsearch/elasticsearch.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly logger = new Logger(ElasticsearchService.name);

  constructor(private readonly es: NestElasticsearchService) {}

  async index<T>(index: string, id: string, document: T) {
    try {
      return await this.es.index<T>({ index, id, document });
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(
          `ES 인덱싱 실패: index=${index}, id=${id}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `ES 인덱싱 실패: index=${index}, id=${id}`,
          String(err),
        );
      }
      throw err;
    }
  }

  async search<T = unknown>(index: string, body: Record<string, unknown>) {
    try {
      return await this.es.search<T>({ index, body });
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(`ES 검색 실패: index=${index}`, err.stack);
      } else {
        this.logger.error(`ES 검색 실패: index=${index}`, String(err));
      }
      throw err;
    }
  }
}
