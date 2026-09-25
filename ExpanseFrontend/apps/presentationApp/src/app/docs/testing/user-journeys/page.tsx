import { ComingSoon } from '../../components/ComingSoon';

export default function UserJourneysPage() {
  return (
    <ComingSoon
      title="User Journeys"
      description="End-to-end user flows documenting key scenarios and expected behaviors."
      expectedContent={[
        'New user onboarding flow',
        'Student presentation viewing journey',
        'Presenter conducting a session',
        'Quest completion and rewards',
        'AI action usage scenarios',
        'Accessibility mode selection',
      ]}
    />
  );
}
