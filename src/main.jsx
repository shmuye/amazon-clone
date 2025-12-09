import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {initialState, reducer} from "./reducer.js";
import { StateProvider } from "./components/StateProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
          <App />
      </StateProvider>
  </StrictMode>,
)
