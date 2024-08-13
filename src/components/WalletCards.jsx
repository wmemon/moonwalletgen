import Card from '@mui/material/Card';
import WalletInfoCard from './WalletInfoCard';
export default function WalletCards({walletsinfo}){
if (walletsinfo.length === 0) return null;
    return(
    <Card sx={{padding: 5}}>
        {walletsinfo.map((walletAddress, idx) => {
            return <WalletInfoCard idx={idx+1} walletAddress={walletAddress} />
        })}
    </Card>
    
    );
}