import { ComingSoon } from '../../components/ComingSoon';

export default function ValuePropositionPage() {
  return (
    <ComingSoon 
      title="Value Proposition"
      description="This section will define why users and organizations choose PresentationApp over alternatives."
      expectedContent={[
        'Core value statements',
        'Competitive differentiators',
        'Unique selling points',
        'Problem-solution fit',
        'Target market advantages',
        'Feature-benefit mapping',
      ]}
    />
  );
}
