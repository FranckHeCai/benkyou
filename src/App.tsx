import Header from "@components/Header"
import Router from "./router/Router"

function App() {

  return (
    <div className="flex flex-col h-screen bg-slate-200 p-3 sm:p-5">
      <Header />
      <Router />
    </div>
  )
}

export default App
