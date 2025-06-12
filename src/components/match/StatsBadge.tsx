
interface StatsBadgeProps {
  result: 'W' | 'L' | 'D';
}

const StatsBadge = ({ result }: StatsBadgeProps) => {
  const getStyles = () => {
    switch (result) {
      case 'W':
        return 'bg-green-500 text-white';
      case 'L':
        return 'bg-red-500 text-white';
      case 'D':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStyles()}`}>
      {result}
    </span>
  );
};

export default StatsBadge;
