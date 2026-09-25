import { ComingSoon } from '../../../components/ComingSoon';

export default function DesignPage() {
  return (
    <ComingSoon
      title="System Design"
      description="Technical design patterns and architectural decisions."
      expectedContent={[
        'Design principles',
        'Pattern decisions (e.g., CQRS, Event Sourcing)',
        'State management approach',
        'Error handling strategy',
        'Caching strategy',
        'Real-time sync design',
      ]}
    />
  );
}
