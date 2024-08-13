import { DialogTitle, TextField , Button, Box, Tooltip, Alert, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { useMemo, useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Buffer} from 'buffer/'
import { HDKey } from 'micro-ed25519-hdkey';
import { Keypair } from '@solana/web3.js';
import WalletCards from './WalletCards';


window.Buffer = Buffer;

export default function MnemonicGeneratorComponent(){

    const [pnPhrase, setPnPhrase] = useState("");
    const [copyStatus, setCopyStatus] = useState(false);
    const [walletsinfo, setWalletsInfo] = useState([]);
    const [numWallets, setNumWallets] = useState(1);

    const seed = useMemo(() => mnemonicToSeedSync(pnPhrase), [pnPhrase])
    const style = {
        color: 'white',
        bgcolor: '#101010',

        "&:hover": {
            backgroundColor: 'black'
        }
    }  
    
    
    function generateSolanaWallets(seed,numWallets){
        console.log("Seed is " + Buffer.from(seed).toString("hex"));
        let walletAddress = [];
        for(let i = 0; i < numWallets; i++){
            const path = `m/44'/501'/${i}'/0'`;
            const hdKey = HDKey.fromMasterSeed(Buffer.from(seed));
            const keyPair =  Keypair.fromSeed(hdKey.derive(path).privateKey);
            const secret = keyPair.secretKey;
            walletAddress.push(Keypair.fromSecretKey(secret).publicKey.toBase58().toString())
            setWalletsInfo(walletAddress)
        }
        console.log(walletAddress);
    }

    function handleNewPhraseGenerate(){
       const mnPhrase = generateMnemonic();
       console.log("Generated Mnemonic: " + mnPhrase);
       setPnPhrase(mnPhrase);
    }

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
      };
    return(
        <div>
        {copyStatus && 
        (<Alert severity="success">
            Your phrase was copied to the clipboard.
        </Alert>)}
        <DialogTitle>Mnemonic Phrase</DialogTitle>
        <TextField value={pnPhrase} onChange={(e) => setPnPhrase(e.target.value)} id="outlined" label="Enter or generate a mnemonic key" variant="outlined" fullWidth sx={
            {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black', // Default outline color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', // Outline color when focused
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "#2e2e2e",
                    fontWeight: "bold",
                    "&.Mui-focused": {
                      color: "black",
                      fontWeight: "bold",
                    },
                  }
                }
              }
        }/>
        <Box sx={{ display: 'flex', p: 5, justifyContent: 'space-evenly' }}>
        <Tooltip title={"Generate mnemonic phrase"}>
            <Button onClick={handleNewPhraseGenerate} variant="contained" sx={style}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            </Button>
        </Tooltip>
        <CopyToClipboard text={pnPhrase} onCopy={onCopyText}>
        <Tooltip title={"Copy"}>
            <Button variant="contained" sx={style}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
            </Button>
        </Tooltip>
        </CopyToClipboard>
        </Box>
        <Box sx={{paddingY: 5}}>
            <FormControl sx={{width: '50%'}}>
            <InputLabel id="demo-simple-select-label" >Number of wallets</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numWallets}
                label="Number of Wallets"
                onChange={(e)=>{setNumWallets(parseInt(e.target.value))}}
            >
                 {Array.from({ length: 12 }, (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
        </Box>
        <Button variant="contained" onClick={() => generateSolanaWallets(seed, numWallets)} sx={style}>
                Generate
        </Button>
        <WalletCards walletsinfo={walletsinfo} />
        
        </div>
    );
}