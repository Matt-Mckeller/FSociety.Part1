import { ComingSoon } from '../../components/ComingSoon';

export default function PositioningPage() {
  return (
    <ComingSoon 
      title="Positioning"
      description="This section will define how PresentationApp differentiates in the market."
      expectedContent={[
        'Market positioning statement',
        'Competitive landscape',
        'Differentiation factors',
        'Target market segments',
        'Messaging framework',
        'Brand voice & tone',
      ]}
    />
  );
}
