function BookingRow({ customer, date, venue, pack, status }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="p-4">{customer}</td>
      <td className="p-4">{date}</td>
      <td className="p-4">{venue}</td>
      <td className="p-4">{pack}</td>
      <td className="p-4">{status}</td>
    </tr>
  );
}

export default BookingRow;
