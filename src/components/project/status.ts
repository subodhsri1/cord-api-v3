import { registerEnumType } from 'type-graphql';

export enum ProjectStatus {
  EarlyConversations = 'early_conversations',
  PendingConceptApproval = 'pending_concept_approval',
  PrepForConsultantEndorsement = 'prep_for_consultant_review',
  PendingConsultantEndorsement = 'pending_consultant_endorsement',
  PrepForFinancialEndorsement = 'prep_for_financial_endorsement',
  PendingFinancialEndorsement = 'pending_financial_analyst_endorsement',
  FinalizingProposal = 'finalizing_proposal',
  PendingAreaDirectorApproval = 'pending_ad_approval',
  PendingRegionalDirectorApproval = 'pending_rd_approval',
  PendingFinanceConfirmation = 'pending_finance_confirmation',
  OnHoldFinanceConfirmation = 'on_hold_finance_confirmation',
  DidNotDevelop = 'did_not_develop',
  Active = 'active',
  Rejected = 'rejected',
  Suspended = 'suspended',
  Terminated = 'terminated',
  Completed = 'completed',
}

registerEnumType(ProjectStatus, { name: 'ProjectStatus' });

// Want to give extra props to enum, this is the only way.
// tslint:disable-next-line: no-namespace
export namespace ProjectStatus {
  const Enum = ProjectStatus;
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Grouping {
    export const InDevelopment = [
      Enum.EarlyConversations,
      Enum.PrepForConsultantEndorsement,
      Enum.PrepForFinancialEndorsement,
      Enum.FinalizingProposal,
    ];
    export const Pending = [
      Enum.PendingConceptApproval,
      Enum.PendingConsultantEndorsement,
      Enum.PendingFinancialEndorsement,
      Enum.PendingAreaDirectorApproval,
      Enum.PendingRegionalDirectorApproval,
      Enum.PendingFinancialEndorsement,
      Enum.OnHoldFinanceConfirmation,
    ];
    export const Active = [Enum.Active];
    export const Stopped = [Enum.Suspended, Enum.Rejected, Enum.Terminated];
    export const Finished = [Enum.DidNotDevelop, Enum.Completed];
  }
}
