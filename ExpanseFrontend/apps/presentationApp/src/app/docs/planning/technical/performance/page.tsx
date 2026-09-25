import { ComingSoon } from '../../../components/ComingSoon';

export default function PerformancePage() {
  return (
    <ComingSoon
      title="Performance"
      description="Performance optimization strategies and targets."
      expectedContent={[
        'Bundle size optimization',
        'Code splitting strategy',
        'Lazy loading',
        'Image optimization',
        'Caching strategies',
        'Core Web Vitals targets',
      ]}
    />
  );
}
