import React, { useState, useRef, useEffect } from 'react';
import { Upload, Eye, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const PhoneCoverApp = () => {
  const phones = {
    'Apple': {
      'iPhone 15': { width: 71.6, height: 147.8 },
      'iPhone 15 Pro': { width: 71.6, height: 147.8 },
      'iPhone 15 Plus': { width: 77.8, height: 160.9 },
      'iPhone 15 Pro Max': { width: 77.8, height: 160.9 },
      'iPhone 14': { width: 71.5, height: 146.7 },
      'iPhone 14 Pro': { width: 71.5, height: 147.5 },
      'iPhone 14 Plus': { width: 77.8, height: 160.9 },
      'iPhone 14 Pro Max': { width: 77.8, height: 160.9 },
      'iPhone 13': { width: 71.5, height: 146.7 },
      'iPhone 13 Pro': { width: 71.5, height: 147.5 },
      'iPhone 13 Pro Max': { width: 77.8, height: 160.8 },
      'iPhone 13 Mini': { width: 64.2, height: 131.5 },
      'iPhone 12': { width: 71.4, height: 146.7 },
      'iPhone 12 Pro': { width: 71.4, height: 147.5 },
      'iPhone 12 Pro Max': { width: 78, height: 160.8 },
      'iPhone 12 Mini': { width: 64.2, height: 131.5 },
      'iPhone SE (3rd gen)': { width: 67.3, height: 138.4 },
      'iPhone SE (2nd gen)': { width: 67.3, height: 138.4 },
      'iPhone 11': { width: 75.7, height: 150.9 },
      'iPhone 11 Pro': { width: 71.4, height: 144.0 },
    },
    'Samsung': {
      'Galaxy S24': { width: 70.6, height: 152.2 },
      'Galaxy S24+': { width: 75.6, height: 162.8 },
      'Galaxy S24 Ultra': { width: 79.8, height: 162.8 },
      'Galaxy S23': { width: 70.9, height: 146.3 },
      'Galaxy S23+': { width: 76.1, height: 157.8 },
      'Galaxy S23 Ultra': { width: 78.6, height: 163.4 },
      'Galaxy S22': { width: 70.6, height: 146.0 },
      'Galaxy S22+': { width: 75.8, height: 157.4 },
      'Galaxy S22 Ultra': { width: 77.8, height: 163.3 },
      'Galaxy S21': { width: 71.2, height: 151.7 },
      'Galaxy S21+': { width: 75.7, height: 161.4 },
      'Galaxy S21 Ultra': { width: 75.6, height: 165.1 },
      'Galaxy A54': { width: 74.8, height: 159.9 },
      'Galaxy A53': { width: 74.8, height: 159.9 },
      'Galaxy A52': { width: 75.1, height: 159.1 },
      'Galaxy A34': { width: 70.0, height: 150.5 },
      'Galaxy A33': { width: 70.0, height: 150.9 },
      'Galaxy Z Fold 5': { width: 67.1, height: 155.1 },
      'Galaxy Z Fold 4': { width: 67.1, height: 155.1 },
      'Galaxy Z Flip 5': { width: 71.9, height: 165.2 },
      'Galaxy Z Flip 4': { width: 71.9, height: 165.2 },
    },
    'Google': {
      'Pixel 8': { width: 70.8, height: 150.5 },
      'Pixel 8 Pro': { width: 73.0, height: 162.6 },
      'Pixel 7': { width: 71.8, height: 152.0 },
      'Pixel 7 Pro': { width: 75.9, height: 163.9 },
      'Pixel 7a': { width: 72.9, height: 152.0 },
      'Pixel 6': { width: 71.8, height: 152.2 },
      'Pixel 6 Pro': { width: 75.9, height: 163.9 },
      'Pixel 6a': { width: 71.8, height: 152.2 },
      'Pixel Fold': { width: 66.0, height: 148.0 },
    },
    'OnePlus': {
      'OnePlus 12': { width: 75.1, height: 160.8 },
      'OnePlus 12R': { width: 75.7, height: 160.5 },
      'OnePlus 11': { width: 72.1, height: 150.4 },
      'OnePlus 11 Pro': { width: 75.9, height: 160.2 },
      'OnePlus 10': { width: 72.9, height: 151.4 },
      'OnePlus 10 Pro': { width: 73.3, height: 160.5 },
    },
    'Xiaomi': {
      'Xiaomi 14': { width: 71.5, height: 152.8 },
      'Xiaomi 14 Ultra': { width: 75.3, height: 164.0 },
      'Xiaomi 13': { width: 71.6, height: 152.8 },
      'Xiaomi 13 Ultra': { width: 75.3, height: 164.0 },
      'Xiaomi 13 Pro': { width: 75.3, height: 164.0 },
      'Xiaomi 12': { width: 69.9, height: 151.8 },
      'Redmi Note 13': { width: 77.9, height: 175.8 },
      'Redmi Note 12': { width: 77.9, height: 175.8 },
      'Poco X6': { width: 72.8, height: 159.6 },
    },
    'OPPO': {
      'OPPO Find X7': { width: 73.0, height: 150.5 },
      'OPPO Find X6': { width: 73.0, height: 150.5 },
      'OPPO Reno 11': { width: 71.6, height: 155.0 },
      'OPPO Reno 10': { width: 71.6, height: 155.0 },
      'OPPO A79': { width: 74.7, height: 165.5 },
    },
    'Vivo': {
      'Vivo X100': { width: 75.2, height: 165.0 },
      'Vivo X90': { width: 75.2, height: 165.0 },
      'Vivo Y100': { width: 74.7, height: 164.7 },
      'Vivo Y80': { width: 77.5, height: 169.6 },
    },
    'Motorola': {
      'Moto Edge 50 Pro': { width: 72.4, height: 160.0 },
      'Moto Edge 40': { width: 72.0, height: 160.0 },
      'Moto G84': { width: 74.9, height: 165.5 },
    },
    'Nothing': {
      'Nothing Phone (2)': { width: 72.0, height: 156.7 },
      'Nothing Phone (1)': { width: 72.0, height: 156.7 },
    },
    'Realme': {
      'Realme 12': { width: 72.3, height: 154.5 },
      'Realme 11': { width: 72.3, height: 154.5 },
      'Realme 10': { width: 74.4, height: 162.5 },
    },
    'Honor': {
      'Honor 200': { width: 74.1, height: 159.8 },
      'Honor 200 Pro': { width: 74.1, height: 159.8 },
      'Honor 100': { width: 74.7, height: 165.0 },
    },
  };

  const [company, setCompany] = useState('Apple');
  const [model, setModel] = useState('iPhone 15');
  const [image, setImage] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [sheetsPerPage, setSheetsPerPage] = useState(2);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const currentPhone = phones[company]?.[model];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setOffsetX(0);
        setOffsetY(0);
        setScale(1);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = () => {
    if (!image || !currentPhone) return;

    const doc = new jsPDF('portrait', 'mm', 'A4');
    const margin = 10;

    const layouts = {
      2: [
        { x: margin, y: margin },
        { x: margin, y: margin + currentPhone.height + 15 }
      ],
      4: [
        { x: margin, y: margin },
        { x: margin + currentPhone.width + 20, y: margin },
        { x: margin, y: margin + currentPhone.height + 20 },
        { x: margin + currentPhone.width + 20, y: margin + currentPhone.height + 20 }
      ]
    };

    const positions = layouts[sheetsPerPage];
    const dpi = 96;
    const mmToPixel = dpi / 25.4;

    positions.forEach((pos) => {
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.roundedRect(pos.x, pos.y, currentPhone.width, currentPhone.height, 3.5, 3.5, 'S');

      if (image) {
        const imgWidth = currentPhone.width * scale;
        const imgHeight = currentPhone.height * scale;
        const imgX = pos.x + (currentPhone.width - imgWidth) / 2 + offsetX / mmToPixel;
        const imgY = pos.y + (currentPhone.height - imgHeight) / 2 + offsetY / mmToPixel;

        doc.addImage(image, 'JPEG', imgX, imgY, imgWidth, imgHeight);
      }

      const markLength = 5;
      doc.setLineWidth(0.2);
      doc.setDrawColor(100, 100, 100);
      
      doc.line(pos.x, pos.y + markLength, pos.x, pos.y);
      doc.line(pos.x, pos.y, pos.x + markLength, pos.y);
      doc.line(pos.x + currentPhone.width - markLength, pos.y, pos.x + currentPhone.width, pos.y);
      doc.line(pos.x + currentPhone.width, pos.y, pos.x + currentPhone.width, pos.y + markLength);
      doc.line(pos.x, pos.y + currentPhone.height - markLength, pos.x, pos.y + currentPhone.height);
      doc.line(pos.x, pos.y + currentPhone.height, pos.x + markLength, pos.y + currentPhone.height);
      doc.line(pos.x + currentPhone.width, pos.y + currentPhone.height - markLength, pos.x + currentPhone.width, pos.y + currentPhone.height);
      doc.line(pos.x + currentPhone.width, pos.y + currentPhone.height, pos.x + currentPhone.width - markLength, pos.y + currentPhone.height);
    });

    doc.save('phone-insert-sheets.pdf');
  };

  const renderPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentPhone) return;

    const ctx = canvas.getContext('2d');
    const dpi = 96;
    const mmToPixel = dpi / 25.4;

    canvas.width = 210 * mmToPixel;
    canvas.height = 297 * mmToPixel;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 10 * mmToPixel;
    const layouts = {
      2: [
        { x: margin, y: margin },
        { x: margin, y: margin + currentPhone.height * mmToPixel + 15 * mmToPixel }
      ],
      4: [
        { x: margin, y: margin },
        { x: margin + (currentPhone.width + 20) * mmToPixel, y: margin },
        { x: margin, y: margin + (currentPhone.height + 20) * mmToPixel },
        { x: margin + (currentPhone.width + 20) * mmToPixel, y: margin + (currentPhone.height + 20) * mmToPixel }
      ]
    };

    const positions = layouts[sheetsPerPage];
    const phoneWidth = currentPhone.width * mmToPixel;
    const phoneHeight = currentPhone.height * mmToPixel;

    positions.forEach((pos) => {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#f9f9f9';
      ctx.beginPath();
      ctx.roundRect(pos.x, pos.y, phoneWidth, phoneHeight, [5]);
      ctx.fill();
      ctx.stroke();

      if (image) {
        const imgWidth = phoneWidth * scale;
        const imgHeight = phoneHeight * scale;
        const imgX = pos.x + (phoneWidth - imgWidth) / 2 + offsetX;
        const imgY = pos.y + (phoneHeight - imgHeight) / 2 + offsetY;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(pos.x, pos.y, phoneWidth, phoneHeight, [5]);
        ctx.clip();
        ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
        ctx.restore();
      }

      ctx.strokeStyle = '#666';
      ctx.lineWidth = 0.8;
      const markLength = 10;
      
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y + markLength);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineTo(pos.x + markLength, pos.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pos.x + phoneWidth - markLength, pos.y);
      ctx.lineTo(pos.x + phoneWidth, pos.y);
      ctx.lineTo(pos.x + phoneWidth, pos.y + markLength);
      ctx.stroke();

      ctx.strokeStyle = '#ddd';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(pos.x + phoneWidth / 2, pos.y);
      ctx.lineTo(pos.x + phoneWidth / 2, pos.y + phoneHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  };

  useEffect(() => {
    if (showPreview && image) {
      renderPreview();
    }
  }, [image, offsetX, offsetY, scale, sheetsPerPage, showPreview]);

  const models = phones[company] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Phone Cover Generator</h1>
        <p className="text-slate-400 mb-6">Create precise insert sheets for custom phone cases</p>

        {!showPreview ? (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-sm text-slate-300 mb-2">Company</label>
              <select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setModel(Object.keys(phones[e.target.value])[0]);
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              >
                {Object.keys(phones).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-sm text-slate-300 mb-2">Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              >
                {Object.keys(models).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {currentPhone && (
                <p className="text-sm text-slate-400 mt-3">
                  {currentPhone.width.toFixed(1)}mm × {currentPhone.height.toFixed(1)}mm
                </p>
              )}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500"
              >
                <div className="font-semibold">📷 Click to Upload Image</div>
                <div className="text-sm text-slate-400">JPG or PNG</div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {image && <p className="text-sm text-green-400 mt-3">✓ Image loaded</p>}
            </div>

            {image && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
                <div>
                  <label className="text-sm text-slate-300">Horizontal: {offsetX}px</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={offsetX}
                    onChange={(e) => setOffsetX(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Vertical: {offsetY}px</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={offsetY}
                    onChange={(e) => setOffsetY(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Scale: {scale.toFixed(2)}x</label>
                  <input
                    type="range"
                    min="0.8"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <label className="block text-sm text-slate-300 mb-3">Sheets Per Page</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSheetsPerPage(2)}
                  className={`flex-1 py-2 rounded-lg font-semibold ${
                    sheetsPerPage === 2 ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  2 per page
                </button>
                <button
                  onClick={() => setSheetsPerPage(4)}
                  className={`flex-1 py-2 rounded-lg font-semibold ${
                    sheetsPerPage === 4 ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  4 per page
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!image}
                className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Eye size={18} /> Preview
              </button>
              <button
                onClick={generatePDF}
                disabled={!image}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Download size={18} /> Export PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShowPreview(false)}
              className="text-slate-400 hover:text-white"
            >
              ← Back
            </button>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="font-semibold mb-4">A4 Preview</h2>
              <canvas
                ref={canvasRef}
                className="bg-white rounded-lg border border-slate-300 max-w-full"
              />
            </div>

            <button
              onClick={generatePDF}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              📥 Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneCoverApp;
