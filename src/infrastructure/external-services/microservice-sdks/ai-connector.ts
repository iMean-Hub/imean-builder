/* eslint-disable @typescript-eslint/no-empty-object-type */
// 这个文件是自动生成的，请不要手动修改
// Generated at 2025-01-23T08:17:46.611Z

import { MicroserviceClient as BaseMicroserviceClient } from 'imean-service-client';
export * from 'imean-service-client';

export interface AgentAssistantsModule {
  /**
   * 创建或更新Agent助手
   */
  upsert: (input: {
    agentId?: string;
    vectorStoreId?: string | null;
    systemInstruction?: string | null;
    isChiefAgent?: boolean;
  }) => Promise<boolean>;
}

export interface DialoguesModule {
  /**
   * 创建对话线程
   */
  createThread: () => Promise<{
    threadId: string;
    threadVectorStoreId: string;
  }>;

  /**
   * 生成对话标题
   */
  generateTitle: (
    hintSummary: string,
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string>;

  /**
   * 生成对话提示
   */
  hintSummary: (
    threadId: string,
    agentId: string,
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string>;

  /**
   * 多轮对话
   */
  multiTurn: (
    params: {
      threadId: string;
      agentId: string;
      text: string;
      titles: string[];
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<
    AsyncIterable<{
      type: 'message' | 'exec' | 'error' | 'ended';
      data?: string;
    }>
  >;

  /**
   * 多轮对话(hint)
   */
  multiHint: (
    params: {
      threadId: string;
      agentId: string;
      text: string;
      title: string;
      tagList: string[];
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<
    AsyncIterable<{
      type: 'message' | 'exec' | 'error' | 'ended';
      data?: string;
    }>
  >;
}

export interface KnowledgeManagementsModule {
  /**
   * 创建或更新知识库
   */
  upsert: (
    input: {
      vectorStoreId?: string | null;
      bucketsFilesDict: Record<string, string[]>;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string>;
}

export interface TaskExecutionsModule {
  /**
   * 执行条件判断
   */
  execIf: (
    input: { request: string; userPrompt: string; currentTime: string },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<boolean>;

  /**
   * 执行循环任务
   */
  execLoop: (
    input: {
      userPrompt: string;
      tasksToBeLooped: string[];
      title: string;
      plannedTask: string[];
      currentTime: string;
      hintMessage?: string;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<number>;

  /**
   * 执行LLM任务
   */
  execLLM: (
    input: {
      content: (
        | { type: string; text: string }
        | {
            type: string;
            image_url: { url: string };
          }
      )[];
      hintMessage?: string;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string>;

  /**
   * 执行推荐任务
   */
  execRecommend: (
    input: { titleList: { id: string; title: string }[]; request: string },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string[]>;

  /**
   * 批量标注任务
   */
  taggingBatch: (
    input: {
      title: string;
      tagList: string[];
      hintMessage: string;
      currentTime: string;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<{
    tagRecords: Record<string, string>[];
    sortingCriteria: string[];
  }>;

  /**
   * 标注单个任务
   */
  taggingSingle: (
    input: {
      title: string;
      tagList: string[];
      currentSubTask: Record<string, Record<string, string>>;
      currentTime: string;
      hintMessage?: string;
      userInstruction?: string;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<Record<string, string>>;

  /**
   * 分析用户货币意图
   */
  analyzeCurrencyIntent: (
    input: string,
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<string | null>;

  /**
   * 表格分析推荐
   */
  analyzeTable: (
    input: {
      messages: {
        role: 'USER' | 'SYSTEM';
        type: 'TEXT' | 'EXEC';
        text?: string;
      }[];
      tableId: string;
    },
    options?: { processId?: string; conversationId?: string; groupId?: string }
  ) => Promise<{ sheetId: string; rowId: string; tags: string[] }[]>;
}

export interface CurrencyConsumersModule {}

export interface CurrenciesModule {
  /**
   * 拉取货币汇率列表
   */
  fetchCurrencies: () => Promise<{
    baseCurrencyCode: string;
    createdAt: Date;
    currencies: { currencyCode: string; exchangeRate: number }[];
  } | null>;

  /**
   * 查询指定基准货币的最新汇率
   */
  getLatestBaseRate: (baseCurrencyCode: string) => Promise<{
    baseCurrencyCode: string;
    createdAt: Date;
    currencies: { currencyCode: string; exchangeRate: number }[];
  } | null>;
}

export class MicroserviceClient extends BaseMicroserviceClient {
  public readonly AgentAssistants = this.registerModule<AgentAssistantsModule>(
    'AgentAssistants',
    {
      upsert: { idempotent: false, stream: false },
    }
  );

  public readonly Dialogues = this.registerModule<DialoguesModule>(
    'Dialogues',
    {
      createThread: { idempotent: false, stream: false },
      generateTitle: { idempotent: false, stream: false },
      hintSummary: { idempotent: false, stream: false },
      multiTurn: { idempotent: false, stream: true },
      multiHint: { idempotent: false, stream: true },
    }
  );

  public readonly KnowledgeManagements =
    this.registerModule<KnowledgeManagementsModule>('KnowledgeManagements', {
      upsert: { idempotent: false, stream: false },
    });

  public readonly TaskExecutions = this.registerModule<TaskExecutionsModule>(
    'TaskExecutions',
    {
      execIf: { idempotent: false, stream: false },
      execLoop: { idempotent: false, stream: false },
      execLLM: { idempotent: false, stream: false },
      execRecommend: { idempotent: false, stream: false },
      taggingBatch: { idempotent: false, stream: false },
      taggingSingle: { idempotent: false, stream: false },
      analyzeCurrencyIntent: { idempotent: false, stream: false },
      analyzeTable: { idempotent: false, stream: false },
    }
  );

  public readonly CurrencyConsumers =
    this.registerModule<CurrencyConsumersModule>('CurrencyConsumers', {});

  public readonly Currencies = this.registerModule<CurrenciesModule>(
    'Currencies',
    {
      fetchCurrencies: { idempotent: false, stream: false },
      getLatestBaseRate: { idempotent: false, stream: false },
    }
  );
}
