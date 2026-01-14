import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // --- STATE INITIAL ---
  const [activeTab, setActiveTab] = useState('focus');
  const [points, setPoints] = useState(100);
  const [timeNow, setTimeNow] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // CUSTOMIZATION STATE
  const [currentTheme, setCurrentTheme] = useState("theme-default");
  const [ownedThemes, setOwnedThemes] = useState(["theme-default"]);
  
  // BACKGROUNDS STATE
  const [currentBg, setCurrentBg] = useState(null); 
  const [ownedBgs, setOwnedBgs] = useState([null]); 

  // CALENDAR STATE
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [calendarEvents, setCalendarEvents] = useState({}); 
  const [selectedDay, setSelectedDay] = useState(null); 
  const [newEventName, setNewEventName] = useState("");
  const [newEventType, setNewEventType] = useState("test");

  // FOCUS & PET STATE
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [petMessage, setPetMessage] = useState(null); 
  
  // SHOP & INVENTORY
  const [currentPet, setCurrentPet] = useState("🦉"); 
  const [inventory, setInventory] = useState(["🦉"]); 
  const [hunger, setHunger] = useState(80);
  const [happiness, setHappiness] = useState(80);

  // MESAJE
  const motivationalQuotes = ["Hai că poți! 🚀", "Încă puțin! 📚", "Ești super! ⭐", "Focus! 👀", "Nu te lăsa! 💪", "Respiră! 🌬️"];

  // --- DATA MAGAZIN ---
  const shopPets = [
    { id: 'owl', name: 'Bufniță', price: 0, icon: '🦉' },
    { id: 'cat', name: 'Pisică', price: 100, icon: '🐱' },
    { id: 'dog', name: 'Câine', price: 150, icon: '🐶' },
    { id: 'fox', name: 'Vulpe', price: 300, icon: '🦊' },
    { id: 'robot', name: 'Robot', price: 500, icon: '🤖' },
    { id: 'dragon', name: 'Dragon', price: 1000, icon: '🐉' }
  ];

  const shopThemes = [
    { id: 'default', name: 'Dark (Default)', price: 0, class: 'theme-default', color: '#1e1e1e' },
    { id: 'forest', name: 'Pădure', price: 150, class: 'theme-forest', color: '#134e5e' },
    { id: 'ocean', name: 'Ocean', price: 200, class: 'theme-ocean', color: '#0f2027' },
    { id: 'sunset', name: 'Sunset', price: 250, class: 'theme-sunset', color: '#651e3e' },
    { id: 'cyber', name: 'Cyberpunk', price: 500, class: 'theme-cyber', color: '#2b003e' }
  ];

  const shopBackgrounds = [
    { id: 'bg_default', name: 'Fără Imagine', price: 0, url: null },
    { id: 'bg_library', name: 'Bibliotecă', price: 200, url: 'https://images.unsplash.com/photo-1507842217121-e0493caf8276?q=80&w=1000&auto=format&fit=crop' },
    { id: 'bg_coffee', name: 'Cafenea', price: 250, url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop' },
    { id: 'bg_rain', name: 'Ploaie', price: 300, url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000&auto=format&fit=crop' },
    { id: 'bg_space', name: 'Spațiu', price: 400, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop' },
    { id: 'bg_loft', name: 'Loft Cozy', price: 500, url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop' }
  ];

  // --- EFECTE ---
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTimeNow(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (isRunning) setPoints(p => p + 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    let msgInterval = null;
    if (isRunning) {
      msgInterval = setInterval(() => {
        const randomMsg = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setPetMessage(randomMsg);
        setTimeout(() => setPetMessage(null), 6000);
      }, 60000); 
    }
    return () => {
      if (msgInterval) clearInterval(msgInterval);
    };
  }, [isRunning]);

  useEffect(() => {
    const lifeCycle = setInterval(() => {
      setHunger(h => Math.max(0, h - 1));
      setHappiness(h => Math.max(0, h - 1));
    }, 10000);
    return () => clearInterval(lifeCycle);
  }, []);

  // --- FUNCTII ---
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const changeTimerDuration = (minutes) => {
    setIsRunning(false); 
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
  };

  const speakPet = () => {
    const randomMsg = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setPetMessage(randomMsg);
    setTimeout(() => setPetMessage(null), 6000);
  };

  // --- SHOP LOGIC ---
  const buyPet = (item) => {
    if (points >= item.price) {
      setPoints(points - item.price);
      setInventory([...inventory, item.icon]); 
      alert(`Ai cumpărat ${item.name}! 🎉`);
    } else { alert(`Nu ai destui bani!`); }
  };
  const equipPet = (icon) => { setCurrentPet(icon); alert("Echipat!"); };

  const buyTheme = (item) => {
    if (points >= item.price) {
      setPoints(points - item.price);
      setOwnedThemes([...ownedThemes, item.class]); 
      alert(`Ai cumpărat tema ${item.name}! 🎨`);
    } else { alert(`Nu ai destui bani!`); }
  };

  // --- FIX AICI: Cand echipezi o tema, scoate imaginea ---
  const equipTheme = (className) => { 
    setCurrentTheme(className); 
    setCurrentBg(null); // <--- ACEASTA LINIE STERGE IMAGINEA
  };

  const buyBackground = (item) => {
    if (points >= item.price) {
      setPoints(points - item.price);
      setOwnedBgs([...ownedBgs, item.url]); 
      alert(`Ai cumpărat fundalul ${item.name}! 🖼️`);
    } else { alert(`Nu ai destui bani!`); }
  };
  
  // Cand echipezi o imagine, e ok, ea se pune peste tema
  const equipBackground = (url) => { setCurrentBg(url); };


  // --- CALENDAR LOGIC ---
  const changeMonth = (offset) => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); };
  
  const saveEvent = () => {
    if (!newEventName.trim()) return;
    const eventKey = `${selectedDay}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    const currentEvents = calendarEvents[eventKey] || [];
    setCalendarEvents({ ...calendarEvents, [eventKey]: [...currentEvents, { type: newEventType, name: newEventName }] });
    setNewEventName("");
  };

  const deleteEvent = (index) => {
    const eventKey = `${selectedDay}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    const currentEvents = calendarEvents[eventKey] || [];
    setCalendarEvents({ ...calendarEvents, [eventKey]: currentEvents.filter((_, i) => i !== index) });
  };

  // --- RENDERERS ---

  const renderShop = () => {
    return (
      <div className="shop-screen">
        <h2 style={{color: '#ffd700'}}>Magazin 🛒</h2>
        
        {/* ANIMALE */}
        <h3 className="shop-section-title">Animale</h3>
        <div className="shop-grid">
          {shopPets.map((item) => {
            const isOwned = inventory.includes(item.icon);
            const isEquipped = currentPet === item.icon;
            return (
              <div key={item.id} className={`shop-item ${isOwned ? 'owned' : ''}`}>
                <span className="shop-icon">{item.icon}</span>
                <span className="shop-name">{item.name}</span>
                {!isOwned && <span className="shop-price">{item.price} 🟡</span>}
                {isOwned ? (isEquipped ? <button className="btn-equipped">Activ</button> : <button className="btn-equip" onClick={() => equipPet(item.icon)}>Alege</button>) 
                         : <button className="btn-buy" onClick={() => buyPet(item)} disabled={points < item.price}>Cumpără</button>}
              </div>
            )
          })}
        </div>

        {/* TEME (CULORI) */}
        <h3 className="shop-section-title" style={{marginTop: 40}}>Teme (Culori)</h3>
        <div className="shop-grid">
          {shopThemes.map((item) => {
            const isOwned = ownedThemes.includes(item.class);
            const isEquipped = currentTheme === item.class && currentBg === null; // Echipat doar daca nu avem si poza
            return (
              <div key={item.id} className={`shop-item ${isOwned ? 'owned' : ''}`}>
                <div className="theme-preview" style={{background: item.color}}></div>
                <span className="shop-name">{item.name}</span>
                {!isOwned && <span className="shop-price">{item.price} 🟡</span>}
                {isOwned ? (isEquipped ? <button className="btn-equipped">Activ</button> : <button className="btn-equip" onClick={() => equipTheme(item.class)}>Alege</button>) 
                         : <button className="btn-buy" onClick={() => buyTheme(item)} disabled={points < item.price}>Cumpără</button>}
              </div>
            )
          })}
        </div>

        {/* IMAGINI DE FUNDAL */}
        <h3 className="shop-section-title" style={{marginTop: 40}}>Imagini de Fundal</h3>
        <div className="shop-grid">
          {shopBackgrounds.map((item) => {
            const isOwned = ownedBgs.includes(item.url);
            const isEquipped = currentBg === item.url;
            return (
              <div key={item.id} className={`shop-item ${isOwned ? 'owned' : ''}`}>
                {item.url ? (
                  <div className="bg-preview" style={{backgroundImage: `url(${item.url})`}}></div>
                ) : (
                  <div className="bg-preview" style={{background: '#333', display:'flex', alignItems:'center', justifyContent:'center'}}>❌</div>
                )}
                <span className="shop-name">{item.name}</span>
                {!isOwned && <span className="shop-price">{item.price} 🟡</span>}
                {isOwned ? (isEquipped ? <button className="btn-equipped">Activ</button> : <button className="btn-equip" onClick={() => equipBackground(item.url)}>Alege</button>) 
                         : <button className="btn-buy" onClick={() => buyBackground(item)} disabled={points < item.price}>Cumpără</button>}
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
    const monthName = currentDate.toLocaleString('ro-RO', { month: 'long', year: 'numeric' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    return (
      <div className="calendar-screen">
        <div className="calendar-nav">
          <button className="nav-btn" onClick={() => changeMonth(-1)}>◀ Prev</button>
          <h2 style={{margin:0, color: '#ffd700'}}>{capitalizedMonth}</h2>
          <button className="nav-btn" onClick={() => changeMonth(1)}>Next ▶</button>
        </div>
        <div className="calendar-grid">
          {['L','M','M','J','V','S','D'].map(d => <div key={d} className="cal-header">{d}</div>)}
          {daysArray.map(day => {
            const isToday = isCurrentMonth && day === today.getDate();
            const eventKey = `${day}-${month}-${year}`;
            const events = calendarEvents[eventKey] || [];
            return (
              <div key={day} className={`cal-day ${isToday ? 'today' : ''}`} onClick={() => setSelectedDay(day)}>
                <div className="day-number">{day} {isToday && <span className="today-label">AZI</span>}</div>
                <div style={{overflowY: 'auto', flex: 1}}>
                  {events.map((ev, idx) => (<div key={idx} className={`event-chip ${ev.type}`}>{ev.name}</div>))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  };

  const renderFocus = () => (
    <div className="focus-screen">
      <div className="pet-wrapper" onClick={speakPet}>
        {petMessage && <div className="speech-bubble">{petMessage}</div>}
        <div className="mini-pet">{currentPet}</div>
      </div>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        <button className="time-btn" onClick={() => changeTimerDuration(25)}>25m</button>
        <button className="time-btn" onClick={() => changeTimerDuration(45)}>45m</button>
        <button className="time-btn" onClick={() => changeTimerDuration(60)}>60m</button>
        <input type="number" placeholder="min" className="custom-time-input" onChange={(e) => changeTimerDuration(e.target.value)}/>
      </div>
      <div className="focus-actions">
        <button className="btn-primary" onClick={() => setIsRunning(!isRunning)}>{isRunning ? '⏸ Pauză' : '▶ Start Focus'}</button>
        <button className="btn-reset" onClick={() => {setIsRunning(false); setTimeLeft(initialTime)}}>↺</button>
      </div>
      <div className="input-row">
        <input className="input-dark" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Target nou..." />
        <button className="btn-add" onClick={addTask}>+</button>
      </div>
      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className="task-row">{t.text} <button className="btn-success" onClick={() => { setTasks(tasks.filter(x => x.id !== t.id)); setPoints(p => p + 10); }}>✓</button></li>
        ))}
      </ul>
    </div>
  );

  const renderIsland = () => (
    <div className="island-wrapper">
      <div className="header-bar" style={{background: 'transparent', border: 'none'}}><span>Habitatul lui {currentPet}</span></div>
      <div className="island-scene">
        <div className="big-pet" onClick={() => setHappiness(h => Math.min(100, h+5))}>{currentPet}</div>
        <div className="island-ground"></div>
      </div>
      <div className="stats-container">
        <div className="stat-bar"><span>🍗 Foame:</span><div className="progress-bg"><div className="progress-fill" style={{width: `${hunger}%`, background: hunger < 30 ? 'red' : '#4CAF50'}}></div></div></div>
        <div className="stat-bar"><span>❤️ Fericire:</span><div className="progress-bg"><div className="progress-fill" style={{width: `${happiness}%`, background: '#2196F3'}}></div></div></div>
      </div>
      <div className="island-actions">
        <button className="action-btn" onClick={() => {if (points >= 10 && hunger < 100) { setPoints(p => p - 10); setHunger(h => Math.min(100, h + 20)); } else alert("Nu poti!");}}>🍎</button>
        <button className="action-btn" onClick={() => {if (points >= 5 && happiness < 100) { setPoints(p => p - 5); setHappiness(h => Math.min(100, h + 15)); } else alert("Nu poti");}}>🎾</button>
        <button className="action-btn" onClick={() => setActiveTab('shop')} style={{marginLeft: 'auto', fontSize: '1rem', borderRadius: '10px'}}>🛒 Mergi la Shop</button>
      </div>
    </div>
  );

  return (
    <div 
      className={`app-container ${currentTheme}`}
      style={currentBg ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentBg})` } : {}} 
    >
      {selectedDay && (
        <div className="modal-overlay" onClick={(e) => {if (e.target.className === 'modal-overlay') setSelectedDay(null);}}>
          <div className="modal-content">
            <h3>{selectedDay} {currentDate.toLocaleString('ro-RO', { month: 'long' })}</h3>
            {(() => {
              const eventKey = `${selectedDay}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
              const events = calendarEvents[eventKey] || [];
              if (events.length > 0) {
                return (
                  <div className="modal-existing-events">
                    <label className="modal-label" style={{marginBottom: 10}}>Evenimente existente:</label>
                    {events.map((ev, idx) => {
                      let color = '#4CAF50'; if(ev.type === 'test') color = '#f44336'; if(ev.type === 'session') color = '#ff9800';
                      return (
                        <div key={idx} className="modal-event-row">
                          <div className="modal-event-info"><div className="mini-dot" style={{backgroundColor: color}}></div><span>{ev.name}</span></div>
                          <button className="btn-delete-event" onClick={() => deleteEvent(idx)} title="Sterge">🗑️</button>
                        </div>
                      )
                    })}
                  </div>
                )
              }
            })()}
            <label className="modal-label">Adaugă nou:</label>
            <input className="input-dark" style={{width: '90%'}} value={newEventName} onChange={(e) => setNewEventName(e.target.value)} placeholder="Nume..." autoFocus />
            <div className="event-type-selector" style={{marginTop: 10}}>
              <button className={`type-btn test ${newEventType === 'test' ? 'selected' : ''}`} onClick={() => setNewEventType('test')}>🔴</button>
              <button className={`type-btn session ${newEventType === 'session' ? 'selected' : ''}`} onClick={() => setNewEventType('session')}>🟠</button>
              <button className={`type-btn other ${newEventType === 'other' ? 'selected' : ''}`} onClick={() => setNewEventType('other')}>🟢</button>
            </div>
            <div style={{display: 'flex', gap: 10, marginTop: 20}}>
              <button className="btn-primary" onClick={saveEvent} style={{flex: 1}}>Salvează</button>
              <button className="btn-primary" onClick={() => setSelectedDay(null)} style={{background: '#555', flex: 1}}>Închide</button>
            </div>
          </div>
        </div>
      )}

      <div className="header-bar">
        <div style={{display: 'flex', alignItems: 'center'}}><span>FocusNook</span><span className="real-time-clock">{timeNow}</span></div>
        <span style={{color: '#ffd700'}}>{points} 🟡</span>
      </div>

      <div className="main-content">
        {activeTab === 'focus' && renderFocus()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'island' && renderIsland()}
        {activeTab === 'shop' && renderShop()} 
      </div>

      <div className="nav-bar">
        <button className={`nav-item ${activeTab === 'focus' ? 'active' : ''}`} onClick={() => setActiveTab('focus')}>🏠 <span>Focus</span></button>
        <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>📅 <span>Calendar</span></button>
        <button className={`nav-item ${activeTab === 'island' ? 'active' : ''}`} onClick={() => setActiveTab('island')}>🏝️ <span>Insula</span></button>
        <button className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`} onClick={() => setActiveTab('shop')}>🛒 <span>Shop</span></button>
      </div>
    </div>
  )
}

export default App