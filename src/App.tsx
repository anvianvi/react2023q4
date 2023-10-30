import './App.css';
import SearchPage from './SearchPage';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </div>
  );
}

export default App;
