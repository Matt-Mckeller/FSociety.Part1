import { ComingSoon } from '../../../components/ComingSoon';

export default function QuestionsDecisionsPage() {
  return (
    <ComingSoon 
      title="Questions & Decisions"
      description="This section will document open questions, decisions made, and important notes throughout the project lifecycle."
      expectedContent={[
        'Open Questions',
        'Decisions Made',
        'Decision Rationale',
        'Important Notes',
        'Assumptions',
        'Constraints',
        'Trade-offs',
      ]}
    />
  );
}
