import { ComingSoon } from '../../components/ComingSoon';

export default function PresetsPage() {
  return (
    <ComingSoon
      title="Presets"
      description="Default configurations and presets for the application."
      expectedContent={[
        'Default theme settings',
        'Default accessibility preferences',
        'Content block presets',
        'Quiz question templates',
        'Action bar configurations',
        'Panel layout presets',
      ]}
    />
  );
}
