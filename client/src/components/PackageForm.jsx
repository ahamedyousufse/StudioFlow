import { useState } from "react";
import { postPackage } from "../api/packageApi";

function PackageForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    const updated = { [event.target.name]: event.target.value };
    setFormData({ ...formData, ...updated });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createPackage();
  }

  async function createPackage() {
    setLoading(true);
    try {
      const status = await postPackage(formData);
      console.log(status);
      console.log("package created successfully")
      return <div>Package created successfully</div>
    } catch (err) {
      return setError(err);
    } finally {
      setLoading(false);
    }
  }

  // console.log(`name: ${formData.name}`);
  // console.log(`price: ${formData.price}`);
  // console.log(`duration: ${formData.duration}`);
  // console.log(`description: ${formData.description}`);

  if(error){
    return <div>Error creating package</div>
  }

  return (
    <form
      action=""
      className="bg-gray-100 rounded-4xl shadow w-fit p-20 mx-auto"
      id="form"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-10 text-center">Add new package</h1>
      <label htmlFor="packageName">Name</label>
      <br />
      <input
        type="text"
        name="name"
        id="packageName"
        className="border-black w-73 h-12 bg-gray-50 shadow rounded-2xl mt-3 mb-2"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="price">Price</label>
      <br />
      <input
        name="price"
        type="text"
        id="price"
        className="border-black w-73 h-12 bg-gray-50 shadow rounded-2xl mt-3 mb-2"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="duration">Duration</label>
      <br />
      <input
        name="duration"
        type="text"
        id="duration"
        className="border-black w-73 h-12 bg-gray-50 shadow rounded-2xl mt-3 mb-2"
        value={formData.duration}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <input
        name="description"
        type="text"
        id="description"
        className="border-black w-73 h-12 bg-gray-50 shadow rounded-2xl mt-3 mb-2"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="submit"
        name="submit"
        id=""
        disabled={loading && "true"}
        value={loading ? "Creating..." : "Create"}
        className={
          loading
            ? "bg-[#2a435c] text-white font-bold p-3 px-30 rounded-2xl"
            : "bg-[#0A2947] text-white font-bold p-3 px-30 rounded-2xl"
        }
      />
    </form>
  );
}

export default PackageForm;
