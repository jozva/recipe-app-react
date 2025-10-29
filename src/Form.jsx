import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form({ onClose, get_data, mode, existingData }) {
    const formik = useFormik({
        initialValues: {
            title: existingData?.title || "",
            time: existingData?.time || "",
            price: existingData?.price || "",
            image_url: existingData?.image_url || "",
        },
        enableReinitialize: true,
        validate: (values) => {
            let error = {};
            if (!values.title) error.title = "Please enter a valid title";
            if (!values.time) error.time = "Please enter a valid time";
            if (!values.price) error.price = "Please enter a correct amount";
            return error;
        },
        onSubmit: async (values) => {
            try {
                if (mode === "edit" && existingData?._id) {
                    await axios.put(
                        `http://localhost:8000/user/${existingData._id}`,
                        values
                    );
                } else {
                    await axios.post("http://localhost:8000/user", values);
                    toast.success("Recipe added successfully!");
                }
                formik.resetForm();
                get_data();
                onClose();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="p-2">
            <p className="text-2xl font-bold mb-4 text-center">
                {mode === "edit" ? "Edit Recipe" : "Add Recipe"}
            </p>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                <label htmlFor="title">Name</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="border p-2 rounded-md"
                />
                {formik.errors.title && (
                    <span className="text-red-500 text-sm">{formik.errors.title}</span>
                )}

                <label htmlFor="time">Time (minutes)</label>
                <input
                    type="number"
                    id="time"
                    name="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    className="border p-2 rounded-md"
                />
                {formik.errors.time && (
                    <span className="text-red-500 text-sm">{formik.errors.time}</span>
                )}


                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className="border p-2 rounded-md"
                />{formik.errors.price && (
                    <span className="text-red-500 text-sm">{formik.errors.price}</span>
                )}


                <label htmlFor="image_url">Image URL</label>
                <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    className="border p-2 rounded-md"
                />{formik.errors.image_url && (
                    <span className="text-red-500 text-sm">{formik.errors.image_url}</span>
                )}


                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
                    >
                        {mode === "edit" ? "Update" : "Submit"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            
        </div>
    );
}

export default Form;
