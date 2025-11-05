import React from "react";
import ModalForm from "./ModalForm";

const App = () => {
    const handleFormSubmit = (data) => {
        console.log("Form submitted:", data);
        alert("Form submitted successfully!");
    };

    const productFields = [
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "email", label: "Supplier Email", type: "email", required: true },
        { name: "description", label: "Description", type: "textarea" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <ModalForm
                title="Add Product"
                buttonText="Add New Product"
                fields={productFields}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default App;
