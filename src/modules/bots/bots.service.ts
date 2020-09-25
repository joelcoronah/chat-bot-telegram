import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class BotsService implements OnModuleInit {

    onModuleInit() {
        this.botMessage();
    }

    constructor(
        private readonly configService: ConfigService
    ) {}

    botMessage() {        
        process.env.NTBA_FIX_319 = "1";
        
        const token = this.configService.get<string>('TELEGRAM_TOKEN');
        
        const bot = new TelegramBot(token, { polling: true });
    
        bot.on('message', (msg) => {
            let Hi = "hi";
            if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
                bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " what would you like to know about me ?");
            }
            
            let response = "Who are you";
            if (msg.text.toString().toLowerCase().includes("who")) {
                bot.sendMessage(msg.chat.id, "I am an intelligent telegram robot, built with Nest.js. Thanks for asking");
            }

            let response2 = "Do you love JavaScript";
            if (msg.text.toString().toLowerCase().includes("javascript")) {
                bot.sendMessage(msg.from.id, "Oh, did I hear you say JavaScript? \n I really love JavaScript");
            }
        });
        
    }
}