export interface Memory {
  id: string;
  year: string;
  title: string;
  story: string;
  achievement: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export const journeyMemories: Memory[] = [
  {
    id: "joined",
    year: "2024",
    title: "Joined Coding Ninjas",
    story: "Started my journey as an enthusiastic member of the club, looking to contribute to the tech community and learn from my peers.",
    achievement: "Officially part of the 10X SRM Chapter",
    date: "Jan 2024",
    imageUrl: "/coding-ninjas/01.jpg",
    tags: ["Community", "Beginnings"]
  },
  {
    id: "event-planning",
    year: "2024",
    title: "Event Planning",
    story: "Organized our first internal coding competition. It was an incredible experience managing logistics, participant queries, and seeing the excitement firsthand.",
    achievement: "Successfully managed 100+ participants",
    date: "Mar 2024",
    imageUrl: "/coding-ninjas/02.jpg",
    tags: ["Events", "Teamwork"]
  },
  {
    id: "corporate-associate",
    year: "2024",
    title: "Corporate Associate",
    story: "Promoted to Corporate Associate. I took charge of sponsor outreach and building relationships with industry partners to secure funding for our major events.",
    achievement: "Secured key early sponsorships",
    date: "May 2024",
    imageUrl: "/coding-ninjas/03.jpg",
    tags: ["Corporate", "Sponsors"]
  },
  {
    id: "corporate-head",
    year: "2024",
    title: "Corporate Head",
    story: "Took over as Corporate Head. This was a major leap in responsibility, leading a dedicated team of associates to manage the club's entire financial and sponsorship pipeline.",
    achievement: "Leading the corporate organizing committee",
    date: "Aug 2024",
    imageUrl: "/coding-ninjas/04.jpg",
    tags: ["Leadership", "Corporate"]
  },
  {
    id: "national-hackathon",
    year: "2024",
    title: "National Hackathon",
    story: "The culmination of months of hard work. We hosted a massive national hackathon that brought together the brightest minds across the country.",
    achievement: "1000+ Participants from 20+ Colleges",
    date: "Nov 2024",
    imageUrl: "/coding-ninjas/05.jpg",
    tags: ["Hackathon", "Leadership", "Milestone"]
  }
];
