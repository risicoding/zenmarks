import { NotepadText } from "lucide-react";
import { IconRenderer } from "@/modules/dashboard/folders/icon-picker";
import { or } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Organize Effortlessly",
    description:
      "Group your bookmarks into customizable folders and tags for quick and intuitive access.",
    icon: "QueueListIcon",
  },
  {
    title: "Seamless Search",
    description:
      "Find exactly what you need with lightning-fast search and smart filters.",
    icon: "DocumentMagnifyingGlassIcon",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    icon: "AcademicCapIcon",
  },
  {
    title: "One-Click Save",
    description:
      "Add bookmarks instantly with a browser extension or mobile app. Save now, read later—your way.",
    icon: "BookmarkIcon",
  },
  {
    title: "Advanced filters",
    icon: "AdjustmentsHorizontalIcon",
    description: "Make your life easier with intuitive filters",
isComing:true
  },
  {
    title: "Dark Mode",
    description:
      "Relax your eyes with a sleek dark theme. Zenmarks looks as good as it works, day or night.",
    icon: "MoonIcon",
  },
];

type FeaturesCardProps = {
  data: {
    title: string;
    description: string;
    icon: string;
  };
isComing?:boolean
};
export const Features = () => {
  return (
    <section className="flex py-12 items-center justify-center">
      <div className="flex max-w-3xl flex-wrap items-center justify-center">
        {items.map((item, index) => (
          <FeaturesCard isComing={item.isComing} data={item} key={index} />
        ))}
      </div>
    </section>
  );
};

const FeaturesCard = ({ data,isComing=false }: FeaturesCardProps) => {
  return (
    <div className="flex h-44 w-full flex-col items-start justify-center border border-gray-200/30 px-6 py-6 sm:w-1/2 md:w-1/2">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <IconRenderer className="size-6" icon={data.icon} />
          <h3 className="font-medium">{data.title}</h3>
{isComing&&(

<Button className="rounded-full border-2" variant='outline'>ComingSoon</Button>
)}
        </div>
        <p className="text-gray-400">{data.description}</p>
        <Link href="/sign-in">Learn More</Link>
      </div>
    </div>
  );
};
