// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// export default function UserCard({
//   title,
//   name,
//   avatar,
// }: {
//   title: string;
//   name: string;
//   avatar?: string;
// }) {
//   return (
//     <Card className="border">
//       <CardHeader>
//         <CardTitle className="text-sm text-muted-foreground">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex items-center gap-4">
//         <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
//           {avatar && (
//             <Image
//               src={avatar}
//               alt={name}
//               fill
//               className="object-cover"
//             />
//           )}
//         </div>
//         <p className="font-medium">{name}</p>
//       </CardContent>
//     </Card>
//   );
// }

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserCardProps {
  title: string;
  name: string;
  avatar?: string | null;
  className?: string;
}

export function UserCard({
  title,
  name,
  avatar,
  className,
}: UserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition",
        className
      )}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar ?? undefined} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
}
