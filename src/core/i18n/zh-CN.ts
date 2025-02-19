import { I18NSettings } from '.';

const lang: I18NSettings = {
  // language: AppLanguage.zh_CN,
  notExist: (source: string, channelId: string) =>
    `找不到资源 ${source} [#${channelId}]!`,
  inviteUserJoinImean: {
    title: '邀请你加入iMean',
    subject: 'iMean邀请',
    inviteTitle: '你好,',
    content: (name: string) => `您已被 ${name} 邀请加入 iMean！`,
    imeanIs: 'iMean 是一个自动化的用户指南生成器。',
    aboutDocument:
      '通过加入 iMean，您将成为一个热衷于记录流程和分享经验的社区的一员。',
    button: '马上加入',
  },
  emailVerify: {
    subject: 'iMean邮箱验证',
    wrongCode: '验证码错误',
    expiredCode: '验证码已过期',
    emailContent: (code: string) => `欢迎使用iMean，您的验证码是：${code}。`,
  },
  user: {
    notExist: '用户不存在',
    wrongPwdOrUsername: '用户名或密码错误',
    passwordRequired: '密码不能为空',
    emailExists: '邮箱已被注册',
    usernameExists: '用户名已存在',
    socialBound: '该社交账号已绑定其他账号',
    passwordError: '密码错误',
  },
  channel: {
    defaultName: '我的流程',
    loginRequired: '请先登录',
    cannotMoveToSameChannel: '不能移动到同一频道',
    cannotMoveToDisableChannel: '频道不可用，无法移动',
    cannotDeleteThisChannel: '不能删除此频道',
  },
  recording: {
    duplicated: '（副本）',
    notExist: '经验不存在',
    untitled: '未命名',
  },
  combinedFlow: {
    atomFlowDisappear: '请检查是否关联的原子流程都存在',
  },
  resolver: {
    arrayCannotBeEmpty: (field) => `字段 [#${field}] 不能为空`,
  },
  invitation: {
    alreadyJoined: '已经加入过了',
    mail: {
      subject: '来自iMean用户的邀请',
      title: '邀请',
      button: '同意',
      greeting: (user) => `你好 ${user},`,
      content: (user, targetName) =>
        `${user} 邀请你成为 ${targetName} 频道 的成员, 点击这里加入:`,
      tips: `(邀请有效期 1 小时, 请在有效期内同意)\n
有任何问题, 请联系我们 postmaster@mail.imean.ai. 
我们将竭诚为您服务.`,
    },
  },
  errors: {
    NETWORK_CONNECTION_ERROR_WRE: '网络连接错误',
    NETWORK_CONNECTION_ERROR_MCE: '网络连接错误',
    NETWORK_CONNECTION_ERROR_HTE: '网络连接错误',
    FLIGHT_SEARCH_SERVICE_UNAVAILABLE_HSE: '航班搜索服务不可用',
    FLIGHT_SEARCH_SERVICE_UNAVAILABLE_TGE: '航班搜索服务不可用',
    PROCESSING_ERROR: '处理错误',
  },
  upload: {
    fileSizeExceeded: (size: number) => `文件大小超出限制 ${size} 字节`,
  },
  process: {
    wrongIndex: (index: number) => `索引[#${index}]错误`,
    wrongComponentType: (blockId: string) => `索引[#${blockId}]组件类型错误`,
    wrongRegister: (processId: string, blockId?: string) =>
      `进程注册失败，请先生成, [#${processId} -> #${blockId}]`,
  },
  agentStream: {
    wrongConversation: (id: string) => `错误的对话 [#${id}]`,
    wrongWorkflow: `错误的流程`,
    wrongAI: `模型内部错误`,
  },
  apiOperation: {
    wrongSheetsValues: '错误的 sheets values!',
  },
  workflow: {
    wrongType: (id: string) => `错误的流程类型 [#${id}]`,
    wrongMultiLinkedList: (id: string) => `错误的多链表流程 [#${id}]`,
    wrongMetadata: (type: string) => `错误的元数据类型 [#${type}]`,
    wrongOriginId: '错误的原始ID',
  },
  chat: {
    waitingProcess: '构建中, 请等待 🚀...',
  },
};

export default lang;
