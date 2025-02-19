import { IWorkflowGroup } from '#domain/types/workflow.interface';
import { AiConnectorService } from '#infrastructure/external-services/ai-connector.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(private readonly aiConnectorService: AiConnectorService) {}

  async searchWorkflows(params: {
    content: string;
    agentId: string;
    conversationId: string;
  }): Promise<IWorkflowGroup[]> {
    console.log('searchWorkflows', params, this.aiConnectorService);
    return [];
    // const { content, agentId, conversationId } = params;
    // const workflowInfos =
    //   await this.aiAgentService.getWorkflowInfosOfAiAgent(agentId);
    // if (!workflowInfos.length) {
    //   return [];
    // }
    // let searchList: string[] = [];
    // try {
    //   searchList =
    //     await this.aiConnectorService.client.TaskExecutions.execRecommend(
    //       {
    //         titleList: workflowInfos.map((item) => ({
    //           title: item.workflow.title!,
    //           id: item.workflow.id,
    //         })),
    //         request: content,
    //       },
    //       { conversationId }
    //     );
    // } catch {
    //   throw new BusinessError(BusinessErrorCode.NETWORK_CONNECTION_ERROR_WRE);
    // }
    // // 数据映射
    // const workflowInfosMap = new Map(
    //   workflowInfos.map((item) => [item.workflow.id.toLowerCase(), item])
    // );
    // const workflows = searchList.reduce(
    //   (acc, item) => {
    //     const workflowInfo = workflowInfosMap.get(item.toLowerCase());
    //     if (workflowInfo) {
    //       const { workflow } = workflowInfo;
    //       acc.push({
    //         id: workflow.id,
    //         title: workflow.title!,
    //         scenarios: workflow.recordingScenario.map((item) => item.scenario),
    //       });
    //     }
    //     return acc;
    //   },
    //   [] as { id: string; title: string; scenarios: ScenarioOutput[] }[]
    // );
    // // 流程编组
    // const workflowGroupMap = new Map<string, WorkflowGroup>();
    // workflows.forEach((workflow) => {
    //   const { title, id, scenarios } = workflow;
    //   const group = workflowGroupMap.get(title);
    //   if (group) {
    //     group.workflows.push({ id, scenarios });
    //   } else {
    //     workflowGroupMap.set(title, {
    //       title,
    //       workflows: [{ id, scenarios }],
    //       scenarios: [],
    //     });
    //   }
    // });
    // const workflowGroups = Array.from(workflowGroupMap.values());
    // workflowGroups.map((group) => {
    //   group.scenarios = uniqBy(
    //     group.workflows.flatMap((item) => item.scenarios),
    //     'id'
    //   );
    //   return group;
    // });
    // return workflowGroups.slice(0, 3);
  }
}
