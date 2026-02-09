
import React, { useState, useEffect } from 'react';
import { getStoredApiKey, setStoredApiKey } from './gemini';

const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setApiKey(getStoredApiKey()); }, []);

  const handleSave = () => {
    setStoredApiKey(apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 max-w-xl mx-auto py-12 text-center">
      <div className="bg-yellow-300 rounded-3xl neo-card p-10">
        <h2 className="text-3xl font-black mb-6 italic uppercase">Cài đặt API Key</h2>
        <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full p-4 border-4 border-black rounded-xl mb-6 font-black" placeholder="Dán API Key..." />
        <button onClick={handleSave} className="w-full py-4 bg-black text-white rounded-xl font-black neo-btn uppercase">
          {saved ? 'Đã lưu ✅' : 'Lưu cài đặt 💾'}
        </button>
        <p className="mt-6 text-xs font-bold opacity-70 italic">Lưu ý: API Key của con được bảo mật cục bộ trên máy này.</p>
      </div>
    </div>
  );
};

export default SettingsView;
