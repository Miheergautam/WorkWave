import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  Calendar,
  ClipboardList,
} from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact US", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <Users />,
    text: "Employee Database",
    description:
      "Maintain a comprehensive database of all employees with easy access to records and details.",
  },
  {
    icon: <UserCheck />,
    text: "Attendance Tracking",
    description:
      "Accurately track and manage employee attendance and leave requests.",
  },
  {
    icon: <Briefcase />,
    text: "Payroll Management",
    description:
      "Streamline payroll processing with automated calculations and direct deposit features.",
  },
  {
    icon: <DollarSign />,
    text: "Expense Management",
    description:
      "Manage employee expenses and reimbursements efficiently with our integrated tools.",
  },
  {
    icon: <Calendar />,
    text: "Scheduling",
    description:
      "Create and manage employee schedules, ensuring optimal coverage and reducing conflicts.",
  },
  {
    icon: <ClipboardList />,
    text: "Performance Reviews",
    description:
      "Conduct and document employee performance reviews to facilitate professional development.",
  },
];

export const checklistItems = [
  {
    title: "Employee Onboarding",
    description:
      "Ensure a smooth onboarding process for new hires with all necessary documentation and training.",
  },
  {
    title: "Compliance Tracking",
    description:
      "Stay compliant with labor laws and regulations with automated tracking and alerts.",
  },
  {
    title: "Benefits Management",
    description:
      "Manage employee benefits, including health insurance, retirement plans, and more.",
  },
  {
    title: "Training Programs",
    description:
      "Develop and manage employee training programs to enhance skills and knowledge.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Employee Database",
      "Attendance Tracking",
      "Basic Reporting",
      "Email Support",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Attendance Tracking",
      "Payroll Management",
      "Expense Management",
      "Priority Support",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Payroll Management",
      "Expense Management",
      "Performance Reviews",
      "Dedicated Account Manager",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "User Guide" },
  { href: "#", text: "FAQs" },
  { href: "#", text: "Support" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Pricing" },
  { href: "#", text: "Integrations" },
  { href: "#", text: "Security" },
  { href: "#", text: "API Documentation" },
];

export const communityLinks = [
  { href: "#", text: "Blog" },
  { href: "#", text: "Webinars" },
  { href: "#", text: "Case Studies" },
  { href: "#", text: "Events" },
  { href: "#", text: "Careers" },
];
