import React, { useState, useRef, useEffect } from 'react';
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
      'iPhone 13': { width: 71.5, height: 146.7 },
      'iPhone 12': { width: 71.4, height: 146.7 },
      'iPhone 11': { width: 75.7, height: 150.9 },
    },
    'Samsung': {
      'Galaxy S24': { width: 70.6, height: 152.2 },
      'Galaxy S24 Ultra': { width: 79.8, height: 162.8 },
      'Galaxy S23': { width: 70.9, height: 146.3 },
      'Galaxy A54': { width: 74.8, height: 159.9 },
      'Galaxy Z Fold 5': { width: 67.1, height: 155.1 },
    },
    'Google': {
      'Pixel 8': { width: 70.8, height: 150.5 },
      'Pixel 8 Pro': { width: 73.0, height: 162.6 },
      'Pixel 7': { width: 71.8, height: 152.0 },
    },
    'OnePlus': {
      'OnePlus 12': { width: 75.1, height: 160.8 },
      'OnePlus 11': { width: 72.1, height: 150.4 },
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
    const phoneWidth = currentPhone.width * mmToPixel;
    const phoneHeight = currentPhone.height * mmToPixel;

    if (sheetsPerPage === 2) {
      const pos1 = { x: margin, y: margin };
      const pos2 = { x: margin, y: margin + phoneHeight + 15 * mmToPixel };
      [pos1, pos2].forEach((pos) => drawPhoneOnCanvas(ctx, pos, phoneWidth, phoneHeight));
    } else {
      const pos1 = { x: margin, y: margin };
      const pos2 = { x: margin + phoneWidth + 20 * mmToPixel, y: margin };
      const pos3 = { x: margin, y: margin + phoneHeight + 20 * mmToPixel };
      const pos4 = { x: margin + phoneWidth + 20 * mmToPixel, y: margin + phoneHeight + 20 * mmToPixel };
      [pos1, pos2, pos3, pos4].forEach((pos) => drawPhoneOnCanvas(ctx, pos, phoneWidth, phoneHeight));
    }
  };

  const drawPhoneOnCanvas = (ctx, pos, phoneWidth, phoneHeight) => {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(pos.x, pos.y, phoneWidth, phoneHeight);
    ctx.strokeRect(pos.x, pos.y, phoneWidth, phoneHeight);

    if (image) {
      const imgWidth = phoneWidth * scale;
      const imgHeight = phoneHeight * scale;
      const imgX = pos.x + (phoneWidth - imgWidth) / 2 + offsetX;
      const imgY = pos.y + (phoneHeight - imgHeight) / 2 + offsetY;

      ctx.save();
      ctx.beginPath();
      ctx.rect(pos.x, pos.y, phoneWidth, phoneHeight);
      ctx.clip();
      ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
      ctx.restore();
    }
  };

  useEffect(() => {
    if (showPreview && image) {
      renderPreview();
    }
  }, [image, offsetX, offsetY, scale, sheetsPerPage, showPreview]);

  const models = phones[company] || {};

  return (
    <div style={{ minHeight: '100vh', background: '#1e293b', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>Phone Cover Generator</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Create precise insert sheets for custom phone cases</p>

        {!showPreview ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '10px' }}>Company</label>
              <select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setModel(Object.keys(phones[e.target.value])[0]);
                }}
                style={{ width: '100%', background: '#475569', border: '1px solid #64748b', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '14px' }}
              >
                {Object.keys(phones).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '10px' }}>Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ width: '100%', background: '#475569', border: '1px solid #64748b', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '14px' }}
              >
                {Object.keys(models).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {currentPhone && (
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
                  {currentPhone.width.toFixed(1)}mm × {currentPhone.height.toFixed(1)}mm
                </p>
              )}
            </div>

            <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ width: '100%', border: '2px dashed #64748b', borderRadius: '10px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: 'transparent', color: 'white' }}
              >
                <div style={{ fontWeight: 'bold' }}>📷 Click to Upload Image</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>JPG or PNG</div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {image && <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '10px' }}>✓ Image loaded</p>}
            </div>

            {image && (
              <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Horizontal: {offsetX}px</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={offsetX}
                    onChange={(e) => setOffsetX(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Vertical: {offsetY}px</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={offsetY}
                    onChange={(e) => setOffsetY(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Scale: {scale.toFixed(2)}x</label>
                  <input
                    type="range"
                    min="0.8"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                </div>
              </div>
            )}

            <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569' }}>
              <label style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '10px', display: 'block' }}>Sheets Per Page</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSheetsPerPage(2)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: sheetsPerPage === 2 ? '#2563eb' : '#475569', color: 'white' }}
                >
                  2 per page
                </button>
                <button
                  onClick={() => setSheetsPerPage(4)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: sheetsPerPage === 4 ? '#2563eb' : '#475569', color: 'white' }}
                >
                  4 per page
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowPreview(true)}
                disabled={!image}
                style={{ flex: 1, background: image ? '#475569' : '#334155', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: image ? 'pointer' : 'not-allowed', opacity: image ? 1 : 0.5 }}
              >
                👁️ Preview
              </button>
              <button
                onClick={generatePDF}
                disabled={!image}
                style={{ flex: 1, background: image ? '#2563eb' : '#334155', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: image ? 'pointer' : 'not-allowed', opacity: image ? 1 : 0.5 }}
              >
                📥 Export PDF
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button
              onClick={() => setShowPreview(false)}
              style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              ← Back
            </button>

            <div style={{ background: '#334155', padding: '20px', borderRadius: '10px', border: '1px solid #475569' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '15px' }}>A4 Preview</h2>
              <canvas
                ref={canvasRef}
                style={{ background: 'white', borderRadius: '8px', border: '1px solid #cbd5e1', maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <button
              onClick={generatePDF}
              style={{ width: '100%', background: '#2563eb', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
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
