import StatCard from "../components/StatCard";
import BookingRow from "../components/BookingRow";

function Dashboard() {
  const statsData = [
    { title: "Total Bookings", value: "14", description: "all bookings made" },
    {
      title: "Pending Bookings",
      value: "7",
      description: "bookings to be completed",
    },
    {
      title: "Revenue",
      value: "104,000LKR",
      description: "total revenue included tax",
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      customer: "Sarah & John",
      date: "2026-07-25",
      venue: "Colombo",
      package: "Gold",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Ahmed & Fathima",
      date: "2026-07-30",
      venue: "Kandy",
      package: "Platinum",
      status: "Confirmed",
    },
    {
      id: 3,
      customer: "David & Maria",
      date: "2026-08-02",
      venue: "Negombo",
      package: "Silver",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex mt-6 gap-6">
        {statsData.map((stats) => (
          <StatCard
            key={stats.title}
            title={stats.title}
            value={stats.value}
            description={stats.description}
          />
        ))}
      </div>
      <table className="w-full mt-6 overflow-hidden rounded-xl bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Customer
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Event
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Venue
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Package
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {upcomingBookings.map((booking) => (
            <BookingRow
              key={booking.id}
              customer={booking.customer}
              date={booking.date}
              venue={booking.venue}
              pack={booking.package}
              status={booking.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
