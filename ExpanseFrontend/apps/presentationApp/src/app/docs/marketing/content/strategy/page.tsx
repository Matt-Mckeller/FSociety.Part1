import { ComingSoon } from '../../../components/ComingSoon';

export default function ContentStrategyPage() {
  return (
    <ComingSoon 
      title="Content Strategy"
      description="This section will define editorial guidelines, content creation workflows, and quality standards."
      expectedContent={[
        'Editorial voice & tone guidelines',
        'Content creation workflow',
        'Quality review process',
        'Content lifecycle management',
        'SEO & discoverability',
        'Localization strategy',
        'Content performance metrics',
      ]}
    />
  );
}
