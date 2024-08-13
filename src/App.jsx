import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MnemonicGeneratorComponent from './components/MnemonicGeneratorComponent';


function App() {
  return (
    <>
      <Card variant="outlined" sx={{ p: 10 }}>
        <h1>Moon Wallet Manager 🌕</h1>
        <p>Generate or manage Solana wallets</p>
        <MnemonicGeneratorComponent />
      </Card>
    </>
  )
}

export default App
