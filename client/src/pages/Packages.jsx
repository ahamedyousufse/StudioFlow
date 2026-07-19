import { useState, useEffect } from "react";
import { getPackages } from "../api/packageApi";

import PackageForm from "../components/PackageForm"

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setshowForm] = useState(false);

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

  function addPackage(){
    setshowForm(true);
  }

  if(showForm){
    return <PackageForm />
  }

  if (loading) {
    return <div>Loading packages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="flex justify-around gap-15">
        <h1 className="text-3xl font-bold w-10/12">Packages</h1>
        <button className="bg-[#0A2947] text-white font-bold p-3 rounded-2xl" onClick={addPackage}>+ Add package</button>
      </div>
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
