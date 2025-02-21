import React, { useState } from 'react';
import { Phone, MessageSquare, Upload, Info } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [systemInfo, setSystemInfo] = useState<string>('Upload an image to get waste-related information.');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Simulating system-generated info
      setSystemInfo('Analysis shows this water source appears to be from a natural spring with moderate mineral content. The clarity suggests good filtration through natural rock layers. Regular testing is recommended for drinking water safety.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-800">Know Your Waste</h1>
            <Info className="text-blue-600 w-8 h-8" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Image Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-blue-500" />
                  <p className="mb-2 text-sm text-blue-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-blue-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Uploaded water sample"
                  className="max-w-md rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Display */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{systemInfo}</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Assistance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Message</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;