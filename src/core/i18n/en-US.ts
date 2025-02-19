import { I18NSettings } from '.';

const lang: I18NSettings = {
  // language: AppLanguage.en_US,
  notExist: (source: string, channelId: string) =>
    `Not found ${source} [#${channelId}]!`,
  inviteUserJoinImean: {
    title: 'Invite',
    subject: 'iMean product invitation',
    inviteTitle: 'Hi there,',
    content: (name: string) =>
      `You have been invited by ${name} to join iMean!`,
    imeanIs: 'iMean is an automated user guide generator.',
    aboutDocument:
      "By joining iMean, you'll be part of a community passionate about documenting processes and sharing their experience.",
    button: 'Accept',
  },
  emailVerify: {
    subject: 'iMean email verification',
    wrongCode: 'Wrong verification code',
    expiredCode: 'Verification code expired',
    emailContent: (code: string) =>
      `Welcome to iMean, your verification code is: ${code}.`,
  },
  user: {
    notExist: 'User does not exist',
    wrongPwdOrUsername: 'Incorrect username or password',
    passwordRequired: 'Password cannot be empty',
    emailExists: 'Email has been registered',
    usernameExists: 'Username already exists',
    socialBound: 'Social account has been bound',
    passwordError: 'Password is incorrect',
  },
  channel: {
    defaultName: `My workflows`,
    loginRequired: 'Please login first',
    cannotMoveToSameChannel: 'Cannot move to the same channel',
    cannotMoveToDisableChannel: 'Channel has expired',
    cannotDeleteThisChannel: 'Channel cannot be deleted',
  },
  recording: {
    duplicated: '（Duplicated）',
    notExist: 'Experience does not exist',
    untitled: 'Untitled',
  },
  combinedFlow: {
    atomFlowDisappear:
      'Please check whether the associated atomic workflow exist!',
  },
  resolver: {
    arrayCannotBeEmpty: (field) => `Field [#${field}] cannot be empty`,
  },
  invitation: {
    alreadyJoined: 'You have already joined',
    mail: {
      subject: 'Invitation from iMean user',
      title: 'Invite',
      button: 'Accept',
      greeting: (user) => `Hi ${user},`,
      content: (user, targetName) =>
        `${user} invite to collaborate channel ${targetName} as Member, click here to join:`,
      tips: `(invitation is valid within 1 hour, please accept in time)\n
If you didn't make the request, please contact our team at postmaster@mail.imean.ai. 
We will help you with that.`,
    },
  },
  errors: {
    NETWORK_CONNECTION_ERROR_WRE: 'Network Connection Error',
    NETWORK_CONNECTION_ERROR_MCE: 'Network Connection Error',
    NETWORK_CONNECTION_ERROR_HTE: 'Network Connection Error',
    FLIGHT_SEARCH_SERVICE_UNAVAILABLE_HSE: 'Flight Search Service Unavailable',
    FLIGHT_SEARCH_SERVICE_UNAVAILABLE_TGE: 'Flight Search Service Unavailable',
    PROCESSING_ERROR: 'Processing Error',
  },
  upload: {
    fileSizeExceeded: (size: number) => `File size exceeded ${size} bytes`,
  },
  process: {
    wrongIndex: (index: number) => `Process Index [#${index}] is wrong`,
    wrongComponentType: (blockId: string) =>
      `Process Index [#${blockId}] ComponentType is wrong`,
    wrongRegister: (processId: string, blockId?: string) =>
      `Process Register failed, Please generate first, [#${processId} -> #${blockId}]`,
  },
  agentStream: {
    wrongConversation: (id: string) => `Wrong conversation [#${id}]`,
    wrongWorkflow: `Wrong workflow`,
    wrongAI: `Wrong AI`,
  },
  apiOperation: {
    wrongSheetsValues: 'Wrong sheets values!',
  },
  workflow: {
    wrongType: (id: string) => `Wrong type [#${id}]`,
    wrongMultiLinkedList: (id: string) => `Wrong multi-linked list [#${id}]`,
    wrongMetadata: (type: string) => `Wrong metadata type [#${type}]`,
    wrongOriginId: 'Wrong origin id',
  },
  chat: {
    waitingProcess: 'Generating process 🚀...',
  },
};

export default lang;
