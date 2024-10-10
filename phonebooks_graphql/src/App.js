import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PhoneBox from './components/Phonebox';
import AddPhone from './components/AddPhone';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client} >
      <Router>
        <Routes>
          <Route path="/" element={<PhoneBox />}></Route>
          <Route path="/add" element={<AddPhone />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
