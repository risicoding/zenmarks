import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import AddBookmarkForm from "./add-bookmark-form";

interface BookmarkNavbarProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  folderId: string;
}
const BookmarkNavbar = ({
  title,
  icon,
  count,
  folderId,
}: BookmarkNavbarProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        {icon}
        <h2>{title}</h2>
        <span>{count}</span>
      </div>
      <Popover >
        <PopoverTrigger asChild>
          <Button>Create</Button>
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <AddBookmarkForm />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BookmarkNavbar;
