export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: CourseLevel;
  estimatedTime: string;
  chapterCount: number;
  draft: boolean;
}

export const courses: Course[] = [
  {
    slug: 'your-agent-os',
    title: 'Your Agent OS',
    tagline: 'Bitcoin took money off the platform. The Agent OS does it for thought.',
    description:
      "Build the system that sits under whatever AI tool you use. Identity, context, skills, memory, connections, verification, automations -- the seven layers that make an agent yours, not the platform's. No-code-required.",
    level: 'Intermediate',
    estimatedTime: '~3 hr',
    chapterCount: 11,
    draft: false,
  },
];

export const getCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);
