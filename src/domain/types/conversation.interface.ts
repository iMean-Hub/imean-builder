import { ConversationStatus } from './conversation.enums';
import { IWorkflowGroup } from './workflow.interface';

export interface IConversation {
  readonly id: string;
  readonly status: ConversationStatus;
  readonly users: string[];
  readonly agentId: string;
  readonly createdAt: Date;
  readonly messages: string[];
  readonly candidateWorkflows?: IWorkflowGroup[];
  readonly currentWorkflow?: IWorkflowGroup | null;
  readonly title: string | null;
  readonly threadId: string | null;
  readonly metadata: JSON | null;
  readonly updatedAt?: Date | null;
  readonly deletedAt: Date | null;
}
