import { useState, useEffect } from "react";
import { getPackages } from "../api/packageApi";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await getPackages();

        setPackages(data);
      } catch (err) {
        console.error("Error loading packages:", err);
        setError("Filed to load them packages");
      } finally {
        setLoading(false);
      }
    }

    loadPackages();
  }, []);

  if (loading) {
    return <div>Loading packages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Packages</h1>
      <div className="flex gap-6 mt-6">
        {packages.map((pack) => (
          <div
            key={pack.id}
            className="flex-1 bg-gray-400 shadow rounded-2xl p-6 px-10"
          >
            <div className="text-3xl font-bold text-center mb-6">
              {pack.name}
            </div>
            <hr></hr>
            <div className="mt-5">
              <li className="mb-1">Rs. {pack.price}</li>
              <li className="mb-1">{pack.duration}</li>
              <li className="mb-1">{pack.description}</li>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;
