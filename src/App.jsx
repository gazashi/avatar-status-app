import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("stats");
    return saved ? JSON.parse(saved) : {
      "集中力": 50,
      "体力": 70,
      "筋力": 60,
      "稼ぐ力": 80,
      "コミュ力": 75,
      "知識": 90,
      "ストレス耐性": 40,
    };
  });

  const [abilities, setAbilities] = useState(() => {
    const saved = localStorage.getItem("abilities");
    return saved ? JSON.parse(saved) : [
      "ハッキング",
      "コピーライティング",
      "作曲家"
    ];
  });

  const [newAbility, setNewAbility] = useState("");
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem("avatarUrl") || null);
  const [glowStatKey, setGlowStatKey] = useState(null);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("abilities", JSON.stringify(abilities));
  }, [abilities]);

  useEffect(() => {
    if (avatarUrl) {
      localStorage.setItem("avatarUrl", avatarUrl);
    }
  }, [avatarUrl]);

  const getBarColor = (value) => {
    if (value >= 90) return "bg-white";
    if (value >= 80) return "bg-pink-400";
    if (value >= 70) return "bg-red-500";
    if (value >= 60) return "bg-orange-400";
    if (value >= 50) return "bg-yellow-300";
    if (value >= 40) return "bg-lime-400";
    if (value >= 30) return "bg-cyan-400";
    return "bg-gray-500";
  };

  const handleStatChange = (oldKey, value) => {
    setGlowStatKey(oldKey);
    setStats({ ...stats, [oldKey]: parseInt(value) });
    setTimeout(() => setGlowStatKey(null), 600);
  };

  const handleStatLabelChange = (oldKey, newKey) => {
    if (!newKey || newKey === oldKey) return;
    const updated = { ...stats };
    updated[newKey] = updated[oldKey];
    delete updated[oldKey];
    setStats(updated);
  };

  const handleAddAbility = () => {
    if (newAbility.trim() !== "") {
      setAbilities([...abilities, newAbility.trim()]);
      setNewAbility("");
    }
  };

  const toggleAbilitySelection = (index) => {
    if (!selectMode) return;
    if (selectedAbilities.includes(index)) {
      setSelectedAbilities(selectedAbilities.filter(i => i !== index));
    } else {
      setSelectedAbilities([...selectedAbilities, index]);
    }
  };

  const handleDeleteSelectedAbilities = () => {
    const updated = abilities.filter((_, i) => !selectedAbilities.includes(i));
    setAbilities(updated);
    setSelectedAbilities([]);
  };

  const handleAbilityEdit = (index, newValue) => {
    const updated = [...abilities];
    updated[index] = newValue;
    setAbilities(updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono text-sm">
      <h1 className="text-2xl mb-4 border-b border-green-500 pb-2">アバターステータス管理</h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="bg-gray-900 text-green-300 w-1/3 flex items-center justify-center p-4 rounded">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 border border-green-500 overflow-hidden mb-2">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-xs">アバター画像未選択</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
            </div>
          </div>

          <div className="bg-gray-900 text-green-300 w-2/3 p-4 rounded">
            <h2 className="text-lg mb-3">ステータス</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={key}
                    onBlur={(e) => handleStatLabelChange(key, e.target.value)}
                    className="bg-green-800 text-xs px-2 py-0.5 rounded w-24 text-center"
                  />
                  <div className="relative flex-1 h-2 bg-green-900 overflow-hidden">
                    <motion.div
                      layout
                      key={`${key}-bar`}
                      className={`h-2 ${getBarColor(value)} ${glowStatKey === key ? "shadow-[0_0_10px_2px_#0ff]" : ""}`}
                      style={{ width: `${value}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <input
                    type="number"
                    className="bg-black text-green-400 border border-green-500 h-6 w-16 text-sm"
                    value={value}
                    onChange={(e) => handleStatChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-green-300 p-4 rounded">
          <h2 className="text-lg mb-3">特殊能力</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <AnimatePresence>
              {abilities.map((ability, index) => (
                <motion.input
                  key={ability + index}
                  initial={{ scale: 0.6, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  type="text"
                  value={ability}
                  onClick={() => toggleAbilitySelection(index)}
                  onChange={(e) => handleAbilityEdit(index, e.target.value)}
                  className={`px-2 py-0.5 rounded text-xs font-bold border border-black bg-yellow-300 text-black shadow-md cursor-pointer w-auto ${
                    selectedAbilities.includes(index) ? "ring-2 ring-green-400" : ""
                  }`}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              className="bg-black text-green-400 border border-green-500 h-6 text-sm"
              value={newAbility}
              placeholder="新しい能力を追加"
              onChange={(e) => setNewAbility(e.target.value)}
            />
            <button
              className="text-green-400 text-xs underline"
              onClick={handleAddAbility}
            >
              追加
            </button>
            <button
              className="text-yellow-400 text-xs underline"
              onClick={() => setSelectMode(!selectMode)}
            >
              {selectMode ? "選択解除" : "選択モード"}
            </button>
            {selectMode && selectedAbilities.length > 0 && (
              <button
                className="text-red-400 text-xs underline"
                onClick={handleDeleteSelectedAbilities}
              >
                選択した能力を削除
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
