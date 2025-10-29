import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import ProductCard from "./ProductCard";

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); 
  const [selectedItem, setSelectedItem] = useState(null); 

  const get_data = async () => {
    try {
      const products = await axios.get("http://localhost:8000/user");
      setUsers(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  const openAddModal = () => {
    setSelectedItem(null);
    setMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const delete_cnf = confirm("Are you sure want to delete")
      if(delete_cnf){
       await axios.delete(`http://localhost:8000/user/${id}`);
       setUsers((prev) => prev.filter((u) => u._id !== id));}
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-5 p-2 bg-orange-400 text-white">
        <div className="col-span-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 h-20 w-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
          <p className="font-bold text-3xl">Recipe App</p>
        </div>
        <div className="content-center">
          <button
            onClick={openAddModal}
            className="font-bold text-xl ml-20 cursor-pointer border-1 p-2 rounded-lg hover:text-orange hover:border-black"
          >
            Add Recipe
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 mt-5">
        {users.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            onEdit={() => openEditModal(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-100 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <Form
              onClose={() => setIsModalOpen(false)}
              get_data={get_data}
              mode={mode}
              existingData={selectedItem}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
