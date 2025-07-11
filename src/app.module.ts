import { Module } from '@nestjs/common';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './database/typeorm';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormConfig,
    }),
    ElasticsearchModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
