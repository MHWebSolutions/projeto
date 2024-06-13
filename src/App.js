import React from 'react';
import GlobalStyle from './styles/GlobalStyle'
import Header from './components/Header';
import Routes from './routes';
import { Router } from 'react-router-dom';
import history from './services/history';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store , {persistor} from './store';
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history = {history}>
        <Header/>
         <Routes/>
         <GlobalStyle/>
         <ToastContainer autoClose={3000} className="toast-container"/>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App;
