import './App.css';
import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

export default function App() {
  return (
    <>
      <header className="App-header">
        <Header />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}