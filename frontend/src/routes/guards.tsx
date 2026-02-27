import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserQuery } from "@/hooks/auth.hooks";

type Role = "USER" | "ADMIN";

interface GuardProps {
  guestOnly?: boolean;
  auth?: boolean;
  verified?: boolean;
  roles?: Role[];
}

export const RouteGuard = ({
  guestOnly,
  auth,
  verified,
  roles,
}: GuardProps) => {
  const { user, isUserLoading } = useUserQuery();

  if (isUserLoading) return <Skeleton />;

  // Guest only (login / signup)
  if (guestOnly && user) {
    return <Navigate to="/" replace />;
  }

  // Auth required
  if (auth && !user) {
    return <Navigate to="/login" replace />;
  }

  // Email verification
  if (verified && user && !user.isVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  // Role-based access
  if (roles && user && !roles.includes(user.role as Role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
