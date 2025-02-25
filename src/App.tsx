import React, { useState, ChangeEvent } from 'react';
import { Phone, MessageSquare, Upload, Info } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [systemInfo, setSystemInfo] = useState<string>('Upload an image to get Diy suggestions');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const languages: { [key: string]: string } = {
    en: 'English',
    ml: 'Malayalam',
    ta: 'Tamil',
    hi: 'Hindi',
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:5001/analyze', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          let translatedText = data.analysis;

          if (selectedLanguage !== 'en') {
            const translateResponse = await fetch('http://localhost:5001/translate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: data.analysis, targetLanguage: selectedLanguage }),
            });

            if (translateResponse.ok) {
              const translateData = await translateResponse.json();
              translatedText = translateData.translatedText;
            } else {
              console.error('Translation failed');
            }
          }
          setSystemInfo(translatedText);
        } else {
          setSystemInfo('Analysis failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during API call:', error);
        setSystemInfo('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-800">DIY UPCYCLING</h1>
            <Info className="text-blue-600 w-8 h-8" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-blue-500" />
                  <p className="mb-2 text-sm text-blue-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-blue-500">PNG, JPG or JPEG (MAX: 800x400px)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            {selectedImage && (
              <div className="mt-4">
                <img src={selectedImage} alt="Uploaded water sample" className="max-w-md rounded-lg shadow-md" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Steps To Follow</h2>
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Select Language:
            </label>
            <select
              id="language"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            {isLoading ? (
              <p className="text-gray-700 leading-relaxed">Analyzing image...</p>
            ) : (
              <p className="text-gray-700 leading-relaxed">{systemInfo}</p>
            )}
          </div>
        </div>

      
      </main>
    </div>
  );
}

export default App;