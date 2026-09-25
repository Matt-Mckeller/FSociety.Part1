import { ComingSoon } from '../../components/ComingSoon';

export default function PersonasPage() {
  return (
    <ComingSoon 
      title="Personas"
      description="This section will define detailed user archetypes representing key audience segments."
      expectedContent={[
        'Student personas (age groups, learning styles)',
        'Teacher personas (subjects, experience levels)',
        'Parent personas (engagement levels, concerns)',
        'Administrator personas (school types, priorities)',
        'User journey maps',
        'Pain points & motivations',
      ]}
    />
  );
}
