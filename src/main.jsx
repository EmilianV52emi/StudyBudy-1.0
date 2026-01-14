import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', background: '#1e1e1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1>Ceva nu a mers bine</h1>
          <p>{this.state.error?.message || 'Eroare necunoscută'}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Reîncarcă pagina
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red; background: #1e1e1e; min-height: 100vh;">Error: Root element not found</div>'
} else {
  try {
    const root = createRoot(rootElement)
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: white; background: #1e1e1e; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <h1>Eroare la încărcare</h1>
      <p>${error.message}</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">Reîncarcă</button>
    </div>`
  }
}
