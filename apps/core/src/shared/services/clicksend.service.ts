// // Imports global types
import ClicksendApi = require('node_modules/clicksend/api');
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as http from 'http';


Injectable()
export class ClicksendService {
  private smsApi: ClicksendApi.SMSApi;

  /**
   * Create a new message object
   *
   * @param configService
   */
  constructor(public configService: ConfigService)
  {
    this.smsApi = new ClicksendApi.SMSApi(
      'bsabat',
      '53B1A8AF-61EB-75D8-E11E-524123A5D4F6'
    );
  }

  /**
   * Send a new txt message
   *
   * @param message
   * @param toPhone
   */
  async sendMessage(
    message: string,
    toPhone: string
  ): Promise <http.IncomingMessage> {
    const smsMessage = new ClicksendApi.SmsMessage();

    smsMessage.source = "sdk";
    smsMessage.to = toPhone;
    smsMessage.body = message;

    const smsCollection = new ClicksendApi.SmsMessageCollection();
    smsCollection.messages = [smsMessage];

    return this.smsApi.smsSendPost(smsCollection);
  }
}


