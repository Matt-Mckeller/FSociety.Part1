import { ComingSoon } from '../../../components/ComingSoon';

export default function ObservabilityPage() {
  return (
    <ComingSoon
      title="Observability"
      description="Monitoring, tracing, and debugging infrastructure."
      expectedContent={[
        'Application metrics',
        'Distributed tracing',
        'Error tracking (Sentry, etc.)',
        'Performance monitoring',
        'Health checks',
        'Alerting strategy',
      ]}
    />
  );
}
