import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RUN VERSE Caught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            backgroundColor: '#0066FF',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 900,
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(0, 102, 255, 0.4)'
          }}>
            R
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>
            RUN <span style={{ color: '#0066FF' }}>VERSE</span>
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '14px', maxWidth: '420px', marginBottom: '20px' }}>
            A client-side initialization notice occurred. Click below to clear local cache and start fresh.
          </p>
          <div style={{
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '16px',
            padding: '16px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'left',
            marginBottom: '20px',
            color: '#ef4444',
            fontSize: '12px',
            fontFamily: 'monospace',
            overflowX: 'auto'
          }}>
            {this.state.error?.message || 'Unknown runtime error'}
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0066FF',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0, 102, 255, 0.3)'
            }}
          >
            Reset Local Storage & Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </StrictMode>
  );
}
