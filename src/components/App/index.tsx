import type React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { indigo as indigoColor, pink as pinkColor } from '@mui/material/colors';
import RandomNumberTab from './RandomNumberTab';
import ListRandomizerTab from './ListRandomizerTab';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import './index.css';

const App: React.FC = () => {
  const [value, setValue] = useState('random-number-tab');

  const handleChange = (event: React.SyntheticEvent, v: string) => setValue(v);

  const theme = createTheme({
    palette: {
      primary: indigoColor,
      secondary: pinkColor,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Random Number" value="random-number-tab" />
            <Tab label="List Randomizer" value="list-randomizer-tab" />
          </TabList>
        </Box>
        <TabPanel value="random-number-tab">
          <RandomNumberTab />
        </TabPanel>
        <TabPanel value="list-randomizer-tab">
          <ListRandomizerTab />
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
};

export default App;
