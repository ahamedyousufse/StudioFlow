function StatCard({ title, value, description }) {
  return <div className="flex-1 bg-gray-400 w-fit p-8 rounded-2xl">
    <div className="text-2xl">{title}</div>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm text-gray-700">{description}</div>
  </div>;
}

export default StatCard;
