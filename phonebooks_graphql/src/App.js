import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PhoneBox from './components/Phonebox';
import AddPhone from './components/AddPhone';
import { Provider } from 'react-redux';
import { store } from './store';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client} >
        <Router>
          <Routes>
            <Route path="/" element={<PhoneBox />}></Route>
            <Route path="/add" element={<AddPhone />}></Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
