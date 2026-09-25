import { ComingSoon } from '../../../components/ComingSoon';

export default function ScalingPage() {
  return (
    <ComingSoon
      title="Scaling"
      description="Scalability and infrastructure considerations."
      expectedContent={[
        'Horizontal scaling strategy',
        'Database sharding',
        'CDN for static assets',
        'Real-time sync at scale',
        'AI service scaling',
        'Cost optimization',
      ]}
    />
  );
}
