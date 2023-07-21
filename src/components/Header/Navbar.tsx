'use client'
import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavbarContext } from 'contexts';

export function Navbar() {
  const { mainContentIndex, setMainContentIndex } = useNavbarContext()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMainContentIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={mainContentIndex} onChange={handleChange} centered>
        <Tab label="Tabela" />
        <Tab label="Gráfico" />
      </Tabs>
    </Box>
  );
}
