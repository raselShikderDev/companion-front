export type UserRole = "EXPLORER" | "SUPER_ADMIN" | "ADMIN";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/signup", "/forget-password"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};



export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

export const explorerProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoute = (pathName: string) => {
  return authRoutes.some((route) => route === pathName);
};

export const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathName)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName));
};

export const getRouteOwner = (
  pathName: string
): "ADMIN" | "EXPLORER" | "COMMON" | null => {
  if (isRouteMatches(pathName, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathName, explorerProtectedRoutes)) {
    return "EXPLORER";
  }
  if (isRouteMatches(pathName, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboard = (role: UserRole): string => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "EXPLORER") {
    return "/dashboard";
  }
  return "/";
};


export const isValidRedirectRoute = (redirectPath:string, role:UserRole):boolean=>{
   const routeOwner = getRouteOwner(redirectPath)
   if (routeOwner === null || routeOwner === "COMMON") {
    return true
   }

   if (routeOwner === role) {
    return true
   }
   return false
}