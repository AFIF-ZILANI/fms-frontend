type CardVariant = "success" | "danger" | "warning" | "info";
interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  isLoading?: boolean;
}

export const DashboardCard: React.FC<CardProps & { variant?: CardVariant }> = ({
  title,
  value,
  isLoading,
  icon,
  description,
  className = "",
  variant = "info",
}) => {
  const variantClasses = {
    success: "text-green-500 bg-green-50 dark:bg-green-900/30",
    danger: "text-red-500 bg-red-50 dark:bg-red-900/30",
    warning: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30",
    info: "text-blue-500 bg-blue-50 dark:bg-blue-900/30",
  }[variant];

  return (
    <div
      className={`rounded-xl shadow-lg p-5 border border-border bg-card text-card-foreground transition-shadow hover:shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-full ${variantClasses}`}>{icon}</div>
      </div>
      <div className="mt-3">
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold">{value}</p>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
};
