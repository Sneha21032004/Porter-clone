import React, { useState } from 'react';

const DriverPage = () => {
  const [licenseFile, setLicenseFile] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [status, setStatus] = useState('Not Verified');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('license', licenseFile);
    formData.append('aadhar', aadharFile);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/upload/upload-verification', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert('Documents uploaded for verification!');
        setStatus('Pending');
      } else {
        const err = await res.json();
        alert(err.message || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while uploading.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-3">
          Driver Verification 🚚
        </h1>

        <p className="text-center text-lg text-gray-700 font-medium mb-6">
          Verification Status: <span className="text-blue-600">{status}</span>
        </p>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Upload License */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="font-medium w-1/3 text-gray-700">Upload License</label>
            <input
              type="file"
              onChange={(e) => setLicenseFile(e.target.files[0])}
              required
              className="w-full sm:w-2/3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          {/* Upload Aadhar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="font-medium w-1/3 text-gray-700">Upload Aadhar</label>
            <input
              type="file"
              onChange={(e) => setAadharFile(e.target.files[0])}
              required
              className="w-full sm:w-2/3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Upload for Verification
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Once uploaded, admin will verify your documents.
        </p>
      </div>
    </div>
  );
};

export default DriverPage;
