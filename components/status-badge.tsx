interface StatusBadgeProps {
  status: 'reported' | 'acknowledged' | 'cleaned';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    reported: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    acknowledged: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    cleaned: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const labels = {
    reported: 'Reported',
    acknowledged: 'Acknowledged',
    cleaned: 'Cleaned',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}
