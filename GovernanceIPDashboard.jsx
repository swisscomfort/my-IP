import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Save, Trash2, ExternalLink } from 'lucide-react';

const GovernanceIPDashboard = () => {
  const modules = [
    { id: 1, title: "Systemische Ausgangslage", part: "I" },
    { id: 2, title: "Audit als Machtzentrum", part: "I" },
    { id: 3, title: "Typologie von Referenzstandards", part: "I" },
    { id: 4, title: "Regulatorische Grauzonen", part: "II" },
    { id: 5, title: "Auditpflicht ohne Toolpflicht", part: "II" },
    { id: 6, title: "Beweisfragen vor dem Recht", part: "II" },
    { id: 7, title: "Dezentrale Verantwortung", part: "II" },
    { id: 8, title: "Scheitern informeller Praxis", part: "II" },
    { id: 9, title: "Negativ-Normierung", part: "III" },
    { id: 10, title: "Kontaktlose Referenzfähigkeit", part: "III" },
    { id: 11, title: "Versionierung & Freeze", part: "III" },
    { id: 12, title: "Audit-Kompatibilität", part: "III" },
    { id: 13, title: "Wie Auditoren Referenzen übernehmen", part: "IV" },
    { id: 14, title: "Institutionelle Diffusion", part: "IV" },
    { id: 15, title: "Warum 'kein Marketing' wirkt", part: "IV" },
    { id: 16, title: "Standard-IP-Erlösmodelle", part: "V" },
    { id: 17, title: "Zahlungslogik in der Praxis", part: "V" },
    { id: 18, title: "Erwartungs-ROI", part: "V" },
    { id: 19, title: "Stop-Kriterien", part: "VI" },
    { id: 20, title: "Persönliche Eignung", part: "VI" },
    { id: 21, title: "Abschlussarbeit (praktisch)", part: "VI" },
  ];

  const [evaluation, setEvaluation] = useState({
    name: '',
    problem: '',
    moduleChecks: {},
    effort: 'mittel',
    lifetime: 'lang',
    maintenance: 'minimal',
    monetization: 'indirekt',
    notes: '',
  });

  const [history, setHistory] = useState([]);
  const [expandedPart, setExpandedPart] = useState('I');
  const [showHistory, setShowHistory] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('governanceIPDashboard');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveDecision = () => {
    if (!evaluation.name.trim()) {
      alert('Gib dem Standard/Problem einen Namen');
      return;
    }

    const checkedModules = Object.keys(evaluation.moduleChecks)
      .filter(key => evaluation.moduleChecks[key])
      .length;

    const decision = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('de-DE'),
      name: evaluation.name,
      problem: evaluation.problem,
      checkedModules,
      totalModules: 21,
      effort: evaluation.effort,
      lifetime: evaluation.lifetime,
      maintenance: evaluation.maintenance,
      monetization: evaluation.monetization,
      recommendation: calculateRecommendation(checkedModules),
      notes: evaluation.notes,
    };

    const newHistory = [decision, ...history];
    setHistory(newHistory);
    localStorage.setItem('governanceIPDashboard', JSON.stringify(newHistory));
    
    // Reset form
    setEvaluation({
      name: '',
      problem: '',
      moduleChecks: {},
      effort: 'mittel',
      lifetime: 'lang',
      maintenance: 'minimal',
      monetization: 'indirekt',
      notes: '',
    });
    
    alert('Entscheidung gespeichert.');
  };

  const calculateRecommendation = (checked) => {
    if (checked < 4) return 'STOP';
    if (checked >= 16 && evaluation.maintenance === 'null' && evaluation.lifetime === 'lang') return 'GO';
    if (checked >= 12) return 'PRÜFEN';
    return 'RUHEN';
  };

  const toggleModule = (moduleId) => {
    setEvaluation(prev => ({
      ...prev,
      moduleChecks: {
        ...prev.moduleChecks,
        [moduleId]: !prev.moduleChecks[moduleId]
      }
    }));
  };

  const checkedCount = Object.values(evaluation.moduleChecks).filter(Boolean).length;
  const recommendation = calculateRecommendation(checkedCount);

  const recommendationColor = {
    'GO': 'bg-green-100 border-green-400 text-green-900',
    'PRÜFEN': 'bg-yellow-100 border-yellow-400 text-yellow-900',
    'RUHEN': 'bg-blue-100 border-blue-400 text-blue-900',
    'STOP': 'bg-red-100 border-red-400 text-red-900',
  };

  const deleteHistoryEntry = (id) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('governanceIPDashboard', JSON.stringify(newHistory));
  };

  const modulesByPart = {
    'I': modules.filter(m => m.part === 'I'),
    'II': modules.filter(m => m.part === 'II'),
    'III': modules.filter(m => m.part === 'III'),
    'IV': modules.filter(m => m.part === 'IV'),
    'V': modules.filter(m => m.part === 'V'),
    'VI': modules.filter(m => m.part === 'VI'),
  };

  const partTitles = {
    'I': 'TEIL I – Grundlage',
    'II': 'TEIL II – Nischen',
    'III': 'TEIL III – Konstruktion',
    'IV': 'TEIL IV – Diffusion',
    'V': 'TEIL V – Monetarisierung',
    'VI': 'TEIL VI – Disziplin',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance-IP Dashboard</h1>
          <p className="text-gray-600">Standard-Opportunity-Entscheidungstool</p>
          <p className="text-xs text-gray-500 mt-2">
            Private Arbeitsfläche | Referenzwerk: 
            <a href="https://github.com/swisscomfort/governance-ip" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 underline ml-1">
              github.com/swisscomfort/governance-ip
            </a>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          
          {/* Main Panel */}
          <div className="col-span-2">
            
            {/* Input Section */}
            <div className="bg-white p-6 rounded border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Problem / Gelegenheit</h2>
              
              <input
                type="text"
                placeholder="Name des Standards oder Problems"
                value={evaluation.name}
                onChange={(e) => setEvaluation(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              
              <textarea
                placeholder="Beschreibung des Audit-Vakuums oder der Gelegenheit"
                value={evaluation.problem}
                onChange={(e) => setEvaluation(prev => ({ ...prev, problem: e.target.value }))}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded h-24 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Module Mapping */}
            <div className="bg-white p-6 rounded border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Modul-Mapping</h2>
              <p className="text-sm text-gray-600 mb-4">Welche Module treffen zu? (Mindestens 4 erforderlich für GO)</p>

              {Object.keys(partTitles).map(part => (
                <div key={part} className="mb-4">
                  <button
                    onClick={() => setExpandedPart(expandedPart === part ? null : part)}
                    className="w-full flex items-center justify-between bg-gray-100 p-3 rounded font-semibold text-gray-900 hover:bg-gray-200"
                  >
                    <span>{partTitles[part]}</span>
                    {expandedPart === part ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedPart === part && (
                    <div className="mt-2 bg-gray-50 p-4 rounded border border-gray-200">
                      {modulesByPart[part].map(module => (
                        <label key={module.id} className="flex items-center mb-2 p-2 hover:bg-white rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={evaluation.moduleChecks[module.id] || false}
                            onChange={() => toggleModule(module.id)}
                            className="w-4 h-4 mr-3"
                          />
                          <span className="text-sm text-gray-700">
                            <strong>Modul {module.id}:</strong> {module.title}
                          </span>
                          <a
                            href={`https://github.com/swisscomfort/governance-ip/blob/main/REFERENZ.txt#modul-${module.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-semibold text-blue-900">
                  Erfüllte Module: <strong>{checkedCount}/21</strong>
                </p>
              </div>
            </div>

            {/* ROI Estimation */}
            <div className="bg-white p-6 rounded border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">ROI-Abschätzung (Modul 16–18)</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aufwand</label>
                  <select
                    value={evaluation.effort}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, effort: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="niedrig">Niedrig</option>
                    <option value="mittel">Mittel</option>
                    <option value="hoch">Hoch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lebensdauer</label>
                  <select
                    value={evaluation.lifetime}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, lifetime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="kurz">Kurz (&lt;2 Jahre)</option>
                    <option value="mittel">Mittel (2–5 Jahre)</option>
                    <option value="lang">Lang (&gt;5 Jahre)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Wartungsbedarf</label>
                  <select
                    value={evaluation.maintenance}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, maintenance: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="null">Keine</option>
                    <option value="minimal">Minimal</option>
                    <option value="hoch">Hoch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monetarisierung</label>
                  <select
                    value={evaluation.monetization}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, monetization: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="keine">Keine</option>
                    <option value="indirekt">Indirekt</option>
                    <option value="mandatsbezogen">Mandatsbezogen</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white p-6 rounded border border-gray-200 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notizen</label>
              <textarea
                value={evaluation.notes}
                onChange={(e) => setEvaluation(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Interne Notizen und Überlegungen..."
                className="w-full px-4 py-2 border border-gray-300 rounded h-16 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Decision Panel */}
          <div className="col-span-1">
            
            {/* Recommendation */}
            <div className={`p-6 rounded border-2 mb-6 ${recommendationColor[recommendation]}`}>
              <h3 className="text-sm font-bold uppercase mb-2">Empfehlung</h3>
              <p className="text-3xl font-bold">{recommendation}</p>
              <p className="text-xs mt-2 opacity-75">
                {recommendation === 'GO' && 'Lohnt sich. Weiter mit Modul 9–12.'}
                {recommendation === 'PRÜFEN' && 'Conditional. Weitere Analyse nötig.'}
                {recommendation === 'RUHEN' && 'Jetzt nicht. Später erneut prüfen.'}
                {recommendation === 'STOP' && 'Nicht sinnvoll. Energie sparen.'}
              </p>
            </div>

            {/* Save Button */}
            <button
              onClick={saveDecision}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 mb-6 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Entscheidung speichern
            </button>

            {/* History Button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-300 mb-6"
            >
              Historie ({history.length})
            </button>

            {/* Rules of Thumb */}
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-xs text-yellow-900 space-y-2">
              <p><strong>GO:</strong> ≥16 Module + Wartung=null + Leben=lang</p>
              <p><strong>PRÜFEN:</strong> 12–15 Module</p>
              <p><strong>RUHEN:</strong> 8–11 Module</p>
              <p><strong>STOP:</strong> &lt;4 Module</p>
            </div>

          </div>
        </div>

        {/* History Section */}
        {showHistory && (
          <div className="mt-8 bg-white p-6 rounded border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Entscheidungs-Historie</h2>
            
            {history.length === 0 ? (
              <p className="text-gray-600">Keine Entscheidungen gespeichert.</p>
            ) : (
              <div className="space-y-4">
                {history.map(entry => (
                  <div key={entry.id} className="p-4 bg-gray-50 rounded border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{entry.name}</p>
                        <p className="text-xs text-gray-600">{entry.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded text-sm font-bold ${
                          entry.recommendation === 'GO' ? 'bg-green-100 text-green-900' :
                          entry.recommendation === 'PRÜFEN' ? 'bg-yellow-100 text-yellow-900' :
                          entry.recommendation === 'RUHEN' ? 'bg-blue-100 text-blue-900' :
                          'bg-red-100 text-red-900'
                        }`}>
                          {entry.recommendation}
                        </span>
                        <button
                          onClick={() => deleteHistoryEntry(entry.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{entry.problem}</p>
                    <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                      <p>Module: {entry.checkedModules}/21</p>
                      <p>Aufwand: {entry.effort}</p>
                      <p>Lebensdauer: {entry.lifetime}</p>
                      <p>Wartung: {entry.maintenance}</p>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">„{entry.notes}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default GovernanceIPDashboard;