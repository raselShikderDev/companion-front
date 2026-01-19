// /** biome-ignore-all assist/source/organizeImports: > */
// /** biome-ignore-all lint/style/useImportType: > */
// /** biome-ignore-all lint/correctness/useExhaustiveDependencies: > */
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   Users,
//   MessageSquare,
//   Home,
//   Briefcase,
//   Search,
//   Menu,
//   CreditCard,
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
// import UserDropdown from "../shared/UserDropdown";

// const explorerNavItems = [
//   { href: "/dashboard", label: "Home", icon: Home },
//   // { href: "/dashboard/create-trip", label: "Create Trip", icon: MapPin },
//   { href: "/dashboard/my-trips", label: "My Trips", icon: Briefcase },
//   { href: "/dashboard/matches", label: "My Matches", icon: Users },
//   { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
//   { href: "/dashboard/find-trips", label: "Find Trips", icon: Search },
//   { href: "/dashboard/subscriptions", label: "Plans", icon: CreditCard },
// ];

// export function ExplorerNavbar() {
//   const pathname = usePathname();


//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between gap-4">
//           {/* LEFT: Logo */}
//           <Link href="/" className="flex items-center gap-2 shrink-0">
//             <Logo />
//             <span className="hidden sm:inline-block text-lg font-semibold">
//               Companion
//             </span>
//           </Link>

//           {/* CENTER: Desktop Navigation */}
//           <nav className="hidden xl:flex items-center gap-1">
//             {explorerNavItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;

//               return (
//                 <Link key={item.href} href={item.href}>
//                   <Button
//                     variant={isActive ? "default" : "ghost"}
//                     size="sm"
//                     className={cn(
//                       "gap-2",
//                       isActive && "bg-primary text-primary-foreground"
//                     )}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span className="whitespace-nowrap">{item.label}</span>
//                   </Button>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* RIGHT: Actions */}
//           <div className="flex items-center gap-2">
//             {/* Logout (desktop only) */}
//             <div className="hidden md:block">
//               {/* <ExplorerLogoutButton /> */}
//               <UserDropdown />
//             </div>

//             {/* Mobile / Tablet Menu */}
//             <div className="xl:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Open menu</span>
//                   </Button>
//                 </SheetTrigger>

//                 <SheetContent side="right" className="w-[300px] sm:w-[360px]">
//                   <SheetHeader>
//                     <SheetTitle className="flex items-center gap-2">
//                       <Logo />
//                       <span>Companion</span>
//                     </SheetTitle>
//                   </SheetHeader>

//                   <nav className="mt-6 flex flex-col gap-1">
//                     {explorerNavItems.map((item) => {
//                       const Icon = item.icon;
//                       const isActive = pathname === item.href;

//                       return (
//                         <Link key={item.href} href={item.href}>
//                           <Button
//                             variant={isActive ? "default" : "ghost"}
//                             className={cn(
//                               "w-full justify-start gap-3 h-11",
//                               isActive && "bg-primary text-primary-foreground"
//                             )}
//                           >
//                             <Icon className="h-5 w-5" />
//                             {item.label}
//                           </Button>
//                         </Link>
//                       );
//                     })}
//                   </nav>

//                   {/* Logout (mobile only) */}
//                   <div className="mt-6 border-t pt-4 md:hidden">
//                     <ExplorerLogoutButton />
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: > */
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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../shared/Logo";
import UserDropdown from "../shared/UserDropdown";

const explorerNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/my-trips", label: "My Trips", icon: Briefcase },
  { href: "/dashboard/matches", label: "My Matches", icon: Users },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/find-trips", label: "Find Trips", icon: Search },
  { href: "/dashboard/subscriptions", label: "Plans", icon: CreditCard },
];

export function ExplorerNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: User + Mobile Menu */}
          <div className="flex items-center gap-2">

            {/* Desktop User Dropdown */}
            <div className="hidden xl:block">
              <UserDropdown />
            </div>

            {/* Mobile / Tablet Menu */}
            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent/40 hover:text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex flex-col w-[300px] sm:w-[360px] p-4"
                >
                  {/* TOP: User Dropdown */}
                  <SheetHeader className="p-0 mb-2 flex-row items-center justify-start">
                    <UserDropdown />
                  </SheetHeader>

                  {/* NAVIGATION */}
                  <nav className="flex flex-col gap-1 flex-1">
                    {explorerNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start gap-3 h-10 px-3",
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

                  {/* BOTTOM: Branding */}
                  <div className="border-t pt-3 mt-3 flex items-center justify-center gap-2 text-muted-foreground">
                    <Logo />
                    <span className="text-sm font-medium">Companion</span>
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
