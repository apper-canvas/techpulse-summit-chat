import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ConferencePage from '@/components/pages/ConferencePage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <ConferencePage />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  )
}

export default App