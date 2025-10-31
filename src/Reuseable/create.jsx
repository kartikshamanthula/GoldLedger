import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const users = useSelector((state) => state.users);

    const [data, setData] = useState({
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: "",
        description: "",
        image: "",
    });

    const [colorInput, setColorInput] = useState("");
    const [sizeInput, setSizeInput] = useState("");
    const [colors, setColors] = useState([]);
    const [combinations, setCombinations] = useState([]);

    useEffect(() => {
        if (id) {
            const existingUser = users.find((user) => String(user.id) === String(id));
            if (existingUser) {
                setData(existingUser);

                if (Array.isArray(existingUser.combinations)) {
                    setCombinations(existingUser.combinations);

                    const uniqueColors = [];
                    existingUser.combinations.forEach((combo) => {
                        let colorObj = uniqueColors.find((c) => c.name === combo.color);
                        if (!colorObj) {
                            colorObj = { name: combo.color, sizes: [] };
                            uniqueColors.push(colorObj);
                        }
                        if (!colorObj.sizes.includes(combo.size)) {
                            colorObj.sizes.push(combo.size);
                        }
                    });
                    setColors(uniqueColors);
                }
            }
        }
    }, [id, users]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const addColor = () => {
        const trimmed = colorInput.trim();
        if (!trimmed) return;
        if (colors.some((c) => c.name === trimmed)) return alert("Color already exists!");
        setColors([...colors, { name: trimmed, sizes: [] }]);
        setColorInput("");
    };

    const addSize = () => {
        const trimmed = sizeInput.trim();
        if (!trimmed) return;
        if (colors.length === 0) return alert("Add a color first!");

        const lastColor = colors[colors.length - 1];
        if (lastColor.sizes.includes(trimmed)) return alert("Size already exists!");

        const updatedColors = colors.map((c, i) =>
            i === colors.length - 1 ? { ...c, sizes: [...c.sizes, trimmed] } : c
        );
        setColors(updatedColors);

        setCombinations([
            ...combinations,
            { color: lastColor.name, size: trimmed, price: "", stock: "" },
        ]);

        setSizeInput("");
    };

    const removeColor = (colorName) => setColors(colors.filter((c) => c.name !== colorName));

    const removeSize = (colorName, size) => {
        const updatedColors = colors.map((c) =>
            c.name === colorName
                ? { ...c, sizes: c.sizes.filter((s) => s !== size) }
                : c
        );
        setColors(updatedColors);
    };

    const removeCombination = (color, size) => {
        setCombinations(
            combinations.filter((combo) => !(combo.color === color && combo.size === size))
        );
    };

    const updateCombination = (index, field, value) => {
        setCombinations((prev) =>
            prev.map((combo, i) => (i === index ? { ...combo, [field]: value } : combo))
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...data, combinations };
        if (id) {
            dispatch(Updateuser(finalData));
        } else {
            dispatch(adduser({ ...finalData, id: Number(data.id) }));
        }
        navigate("/");
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-4/5 mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-8">
                {id ? "Update Product Details" : "Add Product Details"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                        <input
                            type="number"
                            disabled={!!id}
                            value={data.id}
                            onChange={(e) => setData({ ...data, id: Number(e.target.value) })}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Description
                    </label>
                    <textarea
                        rows="2"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                    <input
                        type="file"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const base64 = await convertToBase64(file);
                                setData({ ...data, image: base64 });
                            }
                        }}
                        className="block w-full border rounded-md p-2 text-sm cursor-pointer"
                    />
                    {data.image && (
                        <img
                            src={data.image}
                            alt="Preview"
                            className="mt-3 w-32 h-32 rounded-lg shadow-md object-cover"
                        />
                    )}
                </div>

                {/* Color & Size Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter color"
                                value={colorInput}
                                onChange={(e) => setColorInput(e.target.value)}
                                className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={addColor}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="mt-3 space-y-2">
                            {colors.map((color, i) => (
                                <li key={i} className="bg-gray-50 p-2 rounded-md shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <strong>{color.name}</strong>
                                        <button
                                            type="button"
                                            onClick={() => removeColor(color.name)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {color.sizes.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {color.sizes.map((s, j) => (
                                                <span
                                                    key={j}
                                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                                                >
                                                    {s}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSize(color.name, s)}
                                                        className="text-red-600 hover:text-red-800 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Size */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter size"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                                className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={addSize}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Add
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            (Adds size to the latest color)
                        </p>
                    </div>
                </div>

                {/* Color & Size Table */}
                <div>
                    <h5 className="text-lg font-semibold mb-3">Colour & Size Combinations</h5>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Colour</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {combinations.map((combo, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{combo.color}</TableCell>
                                        <TableCell>{combo.size}</TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                value={combo.price}
                                                onChange={(e) => updateCombination(i, "price", e.target.value)}
                                                className="border rounded-md p-1 w-20 text-center"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                value={combo.stock}
                                                onChange={(e) => updateCombination(i, "stock", e.target.value)}
                                                className="border rounded-md p-1 w-20 text-center"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                type="button"
                                                onClick={() => removeCombination(combo.color, combo.size)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                ✕
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {id ? "Update Product" : "Add Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;
