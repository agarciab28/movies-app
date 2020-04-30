import React, {useState} from 'react';
import Header from './components/Header';
import Movies from './components/Movies';
import NextMovies from './components/NextMovies';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const [nextView, setNextView] = useState('Proximos Estrenos');

  return (
    <ThemeProvider theme={darkTheme}>
      <Header 
        setNextView={setNextView}
        nextView={nextView}
      />
      {(nextView === 'Proximos Estrenos') ? 
        <Movies /> :
        <NextMovies />  
    }
    </ThemeProvider>
  );
}

export default App;
