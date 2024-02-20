import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './Store/Store'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement

);
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </Provider>
);

reportWebVitals();
