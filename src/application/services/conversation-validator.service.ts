import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationValidatorService {
  constructor() {} // private readonly redisService: RedisService

  // TODO 使用Redis二级缓存进行校验
  async validate(params: {
    userIds?: string[];
    agentId?: string;
  }): Promise<boolean> {
    const { userIds, agentId } = params;

    const validArr = await Promise.all([
      this._validAgent(agentId),
      this._validUsers(userIds),
    ]);

    if (validArr.includes(false)) {
      // TODO 异常过滤器
      throw new Error();
    }

    return true;
  }

  async check(params: {
    hasConversation?: { conversationId: string; userId: string };
  }): Promise<boolean> {
    const { hasConversation } = params;

    const validArr = await Promise.all([
      this._checkHasConversation(hasConversation),
    ]);

    if (validArr.includes(false)) {
      // TODO 异常过滤器
      throw new Error();
    }

    return true;
  }

  private async _validAgent(agentId?: string): Promise<boolean> {
    if (!agentId) return true;

    return agentId.length > 0;
  }

  private async _validUsers(users?: string[]): Promise<boolean> {
    if (!users || !users.length) return true;

    return users.length > 0;
  }

  private async _checkHasConversation(params?: {
    conversationId: string;
    userId: string;
  }): Promise<boolean> {
    if (!params) return false;

    const { conversationId, userId } = params;

    return conversationId.length > 0 && userId.length > 0;
  }
}
