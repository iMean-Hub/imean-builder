import { BusinessErrorCodeKeys } from '#core/exceptions/business.exception';
import { Logger } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import en from './en-US';
import cn from './zh-CN';

const APP_LANG = 'zh-CN';

export enum AppLanguage {
  zh_CN = 'zh-CN',
  en_US = 'en-US',
}

export const langs: { [key: string]: I18NSettings } = {
  'zh-CN': cn,
  'en-US': en,
};

export interface I18NSettings {
  // language: AppLanguage;
  notExist(source: string, id: string): string;
  user: {
    notExist: string;
    wrongPwdOrUsername: string;
    passwordRequired: string;
    emailExists: string;
    usernameExists: string;
    socialBound: string;
    passwordError: string;
  };
  inviteUserJoinImean: {
    subject: string;
    title: string;
    content(name: string): string;
    inviteTitle: string;
    imeanIs: string;
    aboutDocument: string;
    button: string;
  };
  emailVerify: {
    subject: string;
    wrongCode: string;
    expiredCode: string;
    emailContent(code: string): string;
  };
  channel: {
    defaultName: string;
    loginRequired: string;
    cannotMoveToSameChannel: string;
    cannotMoveToDisableChannel: string;
    cannotDeleteThisChannel: string;
  };
  recording: {
    notExist: string;
    untitled: string;
    duplicated: string;
  };
  combinedFlow: {
    atomFlowDisappear: string;
  };
  resolver: {
    arrayCannotBeEmpty(field: string): string;
  };
  invitation: {
    alreadyJoined: string;
    mail: {
      subject: string;
      title: string;
      greeting(user: string): string;
      content(user: string, targetName: string): string;
      button: string;
      tips: string;
    };
  };
  errors: { [key in BusinessErrorCodeKeys]: string };
  upload: {
    fileSizeExceeded(size: number): string;
  };
  process: {
    wrongIndex(size: number): string;
    wrongComponentType(blockId: string): string;
    wrongRegister(processId: string, blockId?: string): string;
  };
  agentStream: {
    wrongConversation(id: string): string;
    wrongWorkflow: string;
    wrongAI: string;
  };
  apiOperation: {
    wrongSheetsValues: string;
  };
  workflow: {
    wrongType(id: string): string;
    wrongMultiLinkedList(id: string): string;
    wrongMetadata(type: string): string;
    wrongOriginId: string;
  };
  chat: {
    waitingProcess: string;
  };
}

let _i18n: I18NSettings = langs[APP_LANG] ?? langs['zh-CN'];

function i18n() {
  return _i18n;
}

export function setI18n(language: AppLanguage) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') return;

  language = language ?? AppLanguage.zh_CN;
  const [lang, zone] = language.replace('_', '-').split('-');
  const langCode = [lang.toLowerCase(), zone.toUpperCase()].join('-');
  _i18n = langs[langCode];

  const logger = new Logger();
  // logger.log(`app language change to ${_i18n.language}`);
  const websiteWorkspacePath = path.resolve(__dirname, '../../../workspace');

  try {
    fs.copyFileSync(
      path.join(websiteWorkspacePath, `index.${langCode}.html`),
      path.join(websiteWorkspacePath, 'index.html')
    );
  } catch {
    logger.warn(`index.${langCode}.html not found`);
  }

  const websiteHelpPath = path.resolve(__dirname, '../../../help-popup');
  try {
    fs.copyFileSync(
      path.join(websiteHelpPath, `index.${langCode}.html`),
      path.join(websiteHelpPath, 'index.html')
    );
  } catch {
    logger.warn(`index.${langCode}.html not found`);
  }
}

setI18n(APP_LANG as AppLanguage);

export default i18n;
