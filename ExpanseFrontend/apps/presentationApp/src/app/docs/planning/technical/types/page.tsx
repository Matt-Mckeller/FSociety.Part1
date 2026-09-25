import { ComingSoon } from '../../../components/ComingSoon';

export default function TypesPage() {
  return (
    <ComingSoon
      title="Types"
      description="TypeScript type definitions and interfaces used throughout the application."
      expectedContent={[
        'Core entity types',
        'API request/response types',
        'Component prop types',
        'State management types',
        'Utility types',
        'Enums and constants',
      ]}
    />
  );
}
