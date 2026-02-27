import { Skeleton } from "../ui/skeleton";

const Order_Loader = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default Order_Loader;
