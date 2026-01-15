import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ setResponse, setIsLoading }) => {
  const [formData, setFormData] = useState({
    Packet_Length: "",
    Duration: "",
    Source_Port: "",
    Destination_Port: "",
    Bytes_Sent: "",
    Bytes_Received: "",
    Flow_Packets: "",
    Total_Fwd_Packets: "",
    Total_Bwd_Packets: "",
    Sub_Flow_Fwd_Bytes: "",
    Sub_Flow_Bwd_Bytes: "",
    Attack_Type: "Normal",
  });

  // Update form setiap ada perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", res.data);
      setResponse(res.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponse({ error: "Error occurred while processing the request." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6 font-sans text-lg">
        <div className="grid grid-cols-3 gap-4">
          {/* Packet Length */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Packet Length:
            </label>
            <input
              type="number"
              name="Packet_Length"
              value={formData.Packet_Length}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Duration:
            </label>
            <input
              type="number"
              name="Duration"
              value={formData.Duration}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Source Port */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Source Port:
            </label>
            <input
              type="number"
              name="Source_Port"
              value={formData.Source_Port}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Destination Port */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Destination Port:
            </label>
            <input
              type="number"
              name="Destination_Port"
              value={formData.Destination_Port}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Bytes Sent */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bytes Sent:
            </label>
            <input
              type="number"
              name="Bytes_Sent"
              value={formData.Bytes_Sent}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Bytes Received */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bytes Received:
            </label>
            <input
              type="number"
              name="Bytes_Received"
              value={formData.Bytes_Received}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Flow Packets */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Flow Packets/s:
            </label>
            <input
              type="number"
              name="Flow_Packets"
              value={formData.Flow_Packets}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Total Fwd Packets */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Total Forward Packets:
            </label>
            <input
              type="number"
              name="Total_Fwd_Packets"
              value={formData.Total_Fwd_Packets}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Total Bwd Packets */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Total Backward Packets:
            </label>
            <input
              type="number"
              name="Total_Bwd_Packets"
              value={formData.Total_Bwd_Packets}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Sub Flow Fwd Bytes */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Sub Flow Forward Bytes:
            </label>
            <input
              type="number"
              name="Sub_Flow_Fwd_Bytes"
              value={formData.Sub_Flow_Fwd_Bytes}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Sub Flow Bwd Bytes */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Sub Flow Backward Bytes:
            </label>
            <input
              type="number"
              name="Sub_Flow_Bwd_Bytes"
              value={formData.Sub_Flow_Bwd_Bytes}
              onChange={handleChange}
              required
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Attack Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Attack Type:
            </label>
            <select
              name="Attack_Type"
              value={formData.Attack_Type}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg px-4 py-3 w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
            >
              <option value="Normal">Normal</option>
              <option value="DDoS">DDoS</option>
              <option value="Brute Force">Brute Force</option>
              <option value="Ransomware">Ransomware</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white text-lg px-10 py-3 rounded-xl hover:bg-blue-700 shadow-lg transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
