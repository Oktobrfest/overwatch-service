"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Imports global types
const ClicksendApi = require("node_modules/clicksend/api");
const common_1 = require("@nestjs/common");
common_1.Injectable();
class ClicksendService {
    /**
     * Create a new message object
     *
     * @param configService
     */
    constructor(configService) {
        this.configService = configService;
        this.smsApi = new ClicksendApi.SMSApi('bsabat', '53B1A8AF-61EB-75D8-E11E-524123A5D4F6');
    }
    /**
     * Send a new txt message
     *
     * @param message
     * @param toPhone
     */
    sendMessage(message, toPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const smsMessage = new ClicksendApi.SmsMessage();
            smsMessage.source = "sdk";
            smsMessage.to = toPhone;
            smsMessage.body = message;
            const smsCollection = new ClicksendApi.SmsMessageCollection();
            smsCollection.messages = [smsMessage];
            return this.smsApi.smsSendPost(smsCollection);
        });
    }
}
exports.ClicksendService = ClicksendService;
//# sourceMappingURL=clicksend.service.js.map