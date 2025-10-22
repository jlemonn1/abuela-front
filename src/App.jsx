import React, { useState } from "react";
import { ShiftProvider } from "./context/ShiftContext";
import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import ShiftModal from "./components/ShiftModal/ShiftModal";
import ShiftList from "./components/ShiftList/ShiftList";

function App() {
  // Día seleccionado para editar turno
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <ShiftProvider>
      <div className="app-container">
        <Header />
        
        <main>
          <Calendar onSelectDay={setSelectedDay} />
          <ShiftList />
        </main>

        {selectedDay && (
          <ShiftModal
            day={selectedDay}
            onClose={() => setSelectedDay(null)}
          />
        )}
      </div>
    </ShiftProvider>
  );
}

export default App;
