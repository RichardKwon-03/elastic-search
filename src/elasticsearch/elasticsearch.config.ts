import { ConfigService } from '@nestjs/config';

export interface ElasticsearchConfigOptions {
  node: string;
}

export const getElasticsearchConfig = (
  config: ConfigService,
): ElasticsearchConfigOptions => ({
  node: config.get<string>('ELASTICSEARCH_NODE')!,
});
