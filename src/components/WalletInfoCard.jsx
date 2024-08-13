import { Box } from '@mui/material';
import Card from '@mui/material/Card';
export default function WalletInfoCard({idx, walletAddress}){
    return(
        <Card variant="outlined" sx={{padding: 5}}>
            <div>Wallet {idx}</div>
            <Box sx={{fontSize:14, fontWeight: 'bold'}}>{walletAddress}</Box>
            <Box sx={{fontSize: 12}}>Path: m/44'/501'/1'/0'</Box>
        </Card>
    );
}