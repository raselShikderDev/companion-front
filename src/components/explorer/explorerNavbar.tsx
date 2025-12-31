/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Users,
  MessageSquare,
  Home,
  Briefcase,
  Search,
  Menu,
  CreditCard,
  Settings,
  Lock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExplorerLogoutButton from "./ExplorerLogoutButton";
import Logo from "../shared/Logo";

const explorerNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  // { href: "/dashboard/create-trip", label: "Create Trip", icon: MapPin },
  { href: "/dashboard/my-trips", label: "My Trips", icon: Briefcase },
  { href: "/dashboard/matches", label: "My Matches", icon: Users },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/find-trips", label: "Find Trips", icon: Search },
  { href: "/dashboard/subscriptions", label: "Plans", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/change-password", label: "Change Password", icon: Lock },
];

export function ExplorerNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo />
            <span className="hidden sm:inline-block text-lg font-semibold">
              Companion
            </span>
          </Link>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {explorerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            {/* Logout (desktop only) */}
            <div className="hidden md:block">
              <ExplorerLogoutButton />
            </div>

            {/* Mobile / Tablet Menu */}
            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Logo />
                      <span>Companion</span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="mt-6 flex flex-col gap-1">
                    {explorerNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start gap-3 h-11",
                              isActive && "bg-primary text-primary-foreground"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Logout (mobile only) */}
                  <div className="mt-6 border-t pt-4 md:hidden">
                    <ExplorerLogoutButton />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// /** biome-ignore-all assist/source/organizeImports: > */
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   MapPin,
//   Users,
//   MessageSquare,
//   Home,
//   Briefcase,
//   Search,
//   Menu,
//   CreditCard,
//   Settings,
//   LockIcon,
// } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import ExplorerLogoutButton from "./ExplorerLogoutButton";
// import Logo from "../shared/Logo";

// const explorerNavItems = [
//   { href: "/dashboard", label: "Home", icon: Home },
//   { href: "/dashboard/create-trip", label: "Create Trip", icon: MapPin },
//   { href: "/dashboard/my-trips", label: "My Trips", icon: Briefcase },
//   { href: "/dashboard/matches", label: "My Matches", icon: Users },
//   { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
//   { href: "/dashboard/find-trips", label: "Find Trips", icon: Search },
//   { href: "/dashboard/subscriptions", label: "Plans", icon: CreditCard },
//   { href: "/settings", label: "Settings", icon: Settings },
//   { href: "/change-password", label: "Chnage Password", icon: LockIcon },
// ];

// export function ExplorerNavbar() {
//   const pathname = usePathname();

//   return (
//     <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">

//           {/* LEFT: Logo */}
//           <Link href="/" className="font-bold text-xl text-primary shrink-0">
//             <div className="flex text-xl md:text-2xl gap-2 items-center">
//               <Logo />
//               <p className="hidden xs:block">Companion</p>
//             </div>
//           </Link>

//           {/* CENTER: Desktop Navigation (Hidden on Mobile) */}
//           <div className="hidden lg:flex items-center gap-1">
//             {explorerNavItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
//               return (
//                 <Link key={item.href} href={item.href}>
//                   <Button
//                     variant={isActive ? "default" : "ghost"}
//                     size="sm"
//                     className={cn(
//                       "gap-2 cursor-pointer",
//                       isActive && "bg-primary text-primary-foreground"
//                     )}
//                   >
//                     <Icon className="w-4 h-4" />
//                     <span>{item.label}</span>
//                   </Button>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* RIGHT: Actions (Mobile Menu + Logout) */}
//           <div className="flex items-center gap-2">
//             <div className="hidden sm:block">
//                <ExplorerLogoutButton />
//             </div>

//             {/* Mobile Sidebar Trigger */}
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon" className="shrink-0">
//                     <Menu className="w-5 h-5" />
//                     <span className="sr-only">Toggle Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[280px] sm:w-[350px]">
//                   <SheetHeader>
//                     <SheetTitle className="text-left flex items-center gap-2">
//                       <Logo /> Companion
//                     </SheetTitle>
//                   </SheetHeader>
//                   <div className="flex flex-col gap-2 mt-8">
//                     {explorerNavItems.map((item) => {
//                       const Icon = item.icon;
//                       const isActive = pathname === item.href;
//                       return (
//                         <Link key={item.href} href={item.href}>
//                           <Button
//                             variant={isActive ? "default" : "ghost"}
//                             className={cn(
//                               "w-full justify-start gap-4 h-12",
//                               isActive && "bg-primary text-primary-foreground"
//                             )}
//                           >
//                             <Icon className="w-5 h-5" />
//                             {item.label}
//                           </Button>
//                         </Link>
//                       );
//                     })}
//                     <div className="mt-4 pt-4 border-t sm:hidden">
//                       <ExplorerLogoutButton />
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }
