import './App.css';
import { Box } from '@chakra-ui/react'
import StockData from './Components/StockData';
import StockResult from './Components/StockResult';
import { wrap } from 'framer-motion';
function App() {
  return (
    <div style={{width:"100%"}}>
      <Box display={'flex'} flexWrap={wrap}  justifyContent={'space-between'} w={'100%'} h={'100vh'} p={'2'} >
        <StockData />
        <StockResult/>
      </Box>
    </div>
  );
}

export default App;