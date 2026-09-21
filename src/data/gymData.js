import strength from "../assets/images/programs/strength.jpg";
import athletic from "../assets/images/programs/athletic.jpg";
import recovery from "../assets/images/programs/recovery.jpg";
import nutrition from "../assets/images/programs/nutrition.jpg";

export const programs = [
  {
    id: "strength",
    title: "Strength Training",
    tagline: "Build the foundation everything else stands on.",
    description:
      "Build raw strength with Olympic lifts, compound movements and progressive overload.",
    image: strength,
    intensity: "High",
    duration: "60 min",
    frequency: "3 to 5 per week",
    coach: "Marcus Reid",
    coachRole: "Head of Strength",
    schedule: [
      { day: "Monday", time: "06:00", name: "Strength Foundations" },
      { day: "Tuesday", time: "18:00", name: "Olympic Lifting" },
      { day: "Thursday", time: "18:00", name: "Olympic Lifting" },
      { day: "Friday", time: "06:00", name: "Strength Foundations" },
    ],
    whatToExpect: [
      "Barbell and dumbbell work as the core of every session",
      "Progressive overload tracked in your member app",
      "Small group format capped at 8 people",
      "Form corrections from a certified strength coach every set",
    ],
    benefits: [
      "Increased lean muscle mass",
      "Higher baseline metabolism",
      "Better joint stability and posture",
      "Transferable power for sport and daily life",
    ],
    equipment: [
      "Olympic barbells and bumper plates",
      "Power racks and lifting platforms",
      "Kettlebells and dumbbells up to 70 kg",
      "Specialized grip and mobility tools",
    ],
  },
  {
    id: "athletic",
    title: "Athletic Performance",
    tagline: "Move faster. Jump higher. Last longer.",
    description:
      "Develop explosive speed, agility and power with structured athletic conditioning.",
    image: athletic,
    intensity: "High",
    duration: "50 min",
    frequency: "2 to 4 per week",
    coach: "Elena Voss",
    coachRole: "Athletic Performance",
    schedule: [
      { day: "Monday", time: "17:30", name: "Athletic Conditioning" },
      { day: "Tuesday", time: "18:00", name: "Speed and Agility" },
      { day: "Wednesday", time: "17:30", name: "Athletic Conditioning" },
      { day: "Thursday", time: "18:00", name: "Speed and Agility" },
    ],
    whatToExpect: [
      "Sprint drills and plyometric circuits",
      "Agility ladder and cone work for direction change",
      "Heart rate monitoring throughout the session",
      "Data driven progress reviews every two weeks",
    ],
    benefits: [
      "Faster acceleration and top end speed",
      "Improved change of direction and deceleration",
      "Greater cardiovascular capacity",
      "Reduced injury risk through movement prep",
    ],
    equipment: [
      "Sleds and prowlers",
      "Agility ladders and hurdles",
      "Plyo boxes and medicine balls",
      "Timing gates and speed trackers",
    ],
  },
  {
    id: "recovery",
    title: "Recovery Lab",
    tagline: "The work you do here makes the work out there count.",
    description:
      "Accelerate recovery using ice baths, massage therapy and mobility protocols.",
    image: recovery,
    intensity: "Low",
    duration: "45 min",
    frequency: "Unlimited access",
    coach: "Jordan Blake",
    coachRole: "Recovery Specialist",
    schedule: [
      { day: "Monday", time: "19:00", name: "Recovery Lab" },
      { day: "Wednesday", time: "19:00", name: "Ice Bath Session" },
      { day: "Saturday", time: "10:00", name: "Recovery Lab" },
    ],
    whatToExpect: [
      "Guided ice bath immersion with breath coaching",
      "Infrared sauna and compression boot sessions",
      "Soft tissue work using massage guns and foam rollers",
      "Personalized mobility flows based on your training load",
    ],
    benefits: [
      "Faster muscle repair between sessions",
      "Lower inflammation and soreness",
      "Improved sleep quality",
      "Longer training careers with fewer setbacks",
    ],
    equipment: [
      "Ice baths set to 10 degrees celsius",
      "Infrared saunas",
      "Normatec compression boots",
      "Theragun and foam roller stations",
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition Coaching",
    tagline: "You cannot outtrain a bad diet. So fix the diet.",
    description:
      "Customized nutrition strategies designed to maximize performance and recovery.",
    image: nutrition,
    intensity: "Low",
    duration: "30 min consult",
    frequency: "Weekly check ins",
    coach: "Amara Chen",
    coachRole: "Nutrition Coach",
    schedule: [
      { day: "Tuesday", time: "12:00", name: "Nutrition Workshop" },
      { day: "Thursday", time: "12:00", name: "Nutrition Workshop" },
    ],
    whatToExpect: [
      "One on one consult to assess your goals and current intake",
      "Meal plans built around your training schedule",
      "Grocery lists and meal prep guides sent to your phone",
      "Biweekly body composition scans to track change",
    ],
    benefits: [
      "Sustainable body composition change",
      "Better energy levels through the day",
      "Faster recovery between hard sessions",
      "Clear guidelines instead of guesswork",
    ],
    equipment: [
      "InBody body composition scanner",
      "Metabolic testing equipment",
      "Supplement guidance and on site store",
      "Recipe database in the member app",
    ],
  },
];

export const coaches = [
  {
    id: 1,
    name: "Marcus Reid",
    role: "Head of Strength",
    experience: "12 yrs",
    clients: "310+",
    specialty: "Olympic Lifting",
  },
  {
    id: 2,
    name: "Elena Voss",
    role: "Athletic Performance",
    experience: "9 yrs",
    clients: "260+",
    specialty: "Speed & Agility",
  },
  {
    id: 3,
    name: "Jordan Blake",
    role: "Recovery Specialist",
    experience: "7 yrs",
    clients: "190+",
    specialty: "Mobility & Rehab",
  },
  {
    id: 4,
    name: "Amara Chen",
    role: "Nutrition Coach",
    experience: "8 yrs",
    clients: "220+",
    specialty: "Performance Nutrition",
  },
];

export const scheduleDays = [
  {
    day: "Monday",
    classes: [
      { time: "06:00", name: "Strength Foundations", coach: "Marcus Reid", intensity: "High" },
      { time: "09:00", name: "Mobility Flow", coach: "Jordan Blake", intensity: "Low" },
      { time: "17:30", name: "Athletic Conditioning", coach: "Elena Voss", intensity: "High" },
      { time: "19:00", name: "Recovery Lab", coach: "Jordan Blake", intensity: "Low" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "06:00", name: "Olympic Lifting", coach: "Marcus Reid", intensity: "High" },
      { time: "12:00", name: "Nutrition Workshop", coach: "Amara Chen", intensity: "Low" },
      { time: "18:00", name: "Speed & Agility", coach: "Elena Voss", intensity: "High" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "06:00", name: "Strength Foundations", coach: "Marcus Reid", intensity: "High" },
      { time: "09:00", name: "Mobility Flow", coach: "Jordan Blake", intensity: "Low" },
      { time: "17:30", name: "Athletic Conditioning", coach: "Elena Voss", intensity: "Medium" },
      { time: "19:00", name: "Ice Bath Session", coach: "Jordan Blake", intensity: "Low" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "06:00", name: "Olympic Lifting", coach: "Marcus Reid", intensity: "High" },
      { time: "12:00", name: "Nutrition Workshop", coach: "Amara Chen", intensity: "Low" },
      { time: "18:00", name: "Speed & Agility", coach: "Elena Voss", intensity: "High" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "06:00", name: "Strength Foundations", coach: "Marcus Reid", intensity: "High" },
      { time: "09:00", name: "Mobility Flow", coach: "Jordan Blake", intensity: "Low" },
      { time: "17:00", name: "Full Club Conditioning", coach: "Elena Voss", intensity: "High" },
    ],
  },
  {
    day: "Saturday",
    classes: [
      { time: "08:00", name: "Weekend Warmup", coach: "Elena Voss", intensity: "Medium" },
      { time: "10:00", name: "Recovery Lab", coach: "Jordan Blake", intensity: "Low" },
    ],
  },
  {
    day: "Sunday",
    classes: [
      { time: "09:00", name: "Mobility Flow", coach: "Jordan Blake", intensity: "Low" },
    ],
  },
];

export const membershipPlans = [
  {
    id: "essential",
    name: "Essential",
    price: "$89",
    priceValue: 89,
    period: "/mo",
    description: "For members building a consistent training habit.",
    features: [
      "Full gym floor access",
      "8 group classes / month",
      "Locker room & showers",
      "Mobile app tracking",
    ],
    highlighted: false,
    color: "blue",
  },
  {
    id: "elite",
    name: "Elite",
    price: "$179",
    priceValue: 179,
    period: "/mo",
    description: "Our most popular plan for serious performance goals.",
    features: [
      "Unlimited group classes",
      "2 coaching sessions / month",
      "Full Recovery Lab access",
      "Performance dashboard",
      "Priority class booking",
    ],
    highlighted: true,
    color: "amber",
  },
  {
    id: "performance",
    name: "Performance",
    price: "$299",
    priceValue: 299,
    period: "/mo",
    description: "For athletes who want a fully managed program.",
    features: [
      "Everything in Elite",
      "Weekly 1-on-1 coaching",
      "Custom nutrition plan",
      "Recovery Lab priority access",
      "Quarterly performance review",
    ],
    highlighted: false,
    color: "emerald",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Can I try IronPulse before committing to a membership?",
    answer:
      "Yes. Every new member gets a complimentary guided tour and a single full-access day pass to test the gym floor, a class, and the Recovery Lab before choosing a plan.",
  },
  {
    id: 2,
    question: "Do I need to book classes in advance?",
    answer:
      "Group classes can be booked up to 7 days ahead through the member app. Elite and Performance members get priority booking windows before Essential members.",
  },
  {
    id: 3,
    question: "What's included in the Recovery Lab?",
    answer:
      "Ice bath therapy, infrared sauna, compression boot sessions, sports massage, and guided mobility work. All are trackable through your performance dashboard.",
  },
  {
    id: 4,
    question: "Can I pause or cancel my membership?",
    answer:
      "Memberships can be paused for up to 60 days per year and cancelled anytime with 30 days' notice. There are no lock-in contracts on any plan.",
  },
  {
    id: 5,
    question: "Do you offer coaching for beginners?",
    answer:
      "Every plan includes an onboarding session with a coach to build your baseline program, regardless of experience level.",
  },
];