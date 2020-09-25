import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotsModule } from './modules/bots/bots.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: configService.get('DATABASE_TYPE'),
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [configService.get('TYPEORM_ENTITIES')],
                    subscribers: [configService.get('TYPEORM_SUBSCRIBERS')],
                    synchronize: true,
                } as TypeOrmModuleOptions;
            },
        }),
        BotsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
