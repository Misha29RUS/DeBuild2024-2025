import { Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Users } from "./pages/Users"
import { ActiveTariffs } from "./pages/ActiveTariffs"
import { ArchiveTariffs } from "./pages/ArchiveTariffs"
import { Services } from "./pages/Services"

function App() {
  return (
   <div className="h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/active_tariffs" element={<ActiveTariffs />} />
        <Route path="/archive_tariffs" element={<ArchiveTariffs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
   </div>
  )
}

export default App