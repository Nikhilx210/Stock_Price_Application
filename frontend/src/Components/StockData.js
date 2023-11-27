import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, InputGroup, Button, InputRightElement,useToast,Box
  } from '@chakra-ui/react'
import { Input, VStack } from '@chakra-ui/react'
import { format } from 'date-fns';
import axios from 'axios'
import { useStock } from '../Context/Stock_Context';
const StockData = () => {
    const[Stock_Code,setStock_Code]=useState('');
    const[Start_Date,setStart_Date]=useState(Date);
    const[End_Date,setEnd_Date]=useState(Date);
    const[loading,setloading]=useState(false);
    const[stock_price,setstock_price,StockCode,setStockCode,history_loss,history_val,sethistory_loss,sethistory_val]=useStock();
    const toast=useToast();
    const handleSubmit = async()=>{
        try {
            toast({
                title: 'Success.',
                description: "Please wait for the response from model.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            setloading(true)
            const {data}=await axios.post('http://127.0.0.1:8000/api/predict/',{Stock_Code,Start_Date:Start_Date.substring(0,10),End_Date:End_Date.substring(0,10)});
            const arr=data?.historical_data.concat(data?.future_predictions);
            // console.log(data)
            // console.log(arr);
            const ans1=[]
            for (let i = 0; i < arr.length; i++) {
                ans1.push({
                    x: arr[i].x,
                    y: arr[i][0]
                  });
            }
            console.log(data);
            const ans2=[]
            const ans3=[]
            const arr1=data?.loss;
            const arr2=data?.valid;
            for (let i = 0; i < 40; i++) {
                ans2.push({
                    x: i+1,
                    y: arr1[i]
                  });
                  ans3.push({
                    x: i+1,
                    y: arr2[i]
                  });
            }
            console.log(ans2);
            console.log(ans3);
            sethistory_loss(ans2);
            sethistory_val(ans3);
            setstock_price(ans1);
            setStockCode(Stock_Code);
            setloading(false)
        } catch (error) {
            toast({
                title: 'Error.',
                description: "Something went wrong.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            setloading(false)
            console.log(error);
        }
    }
    return (
        <Box display={'flex'}
          flexDir="column"
          alignItems="center"
          boxShadow="dark-lg"
          p={1}
          bg="#141417"
          w={"39%" }
          borderRadius="lg"
          >
            <VStack spacing={'4'} margin={'27%'} width={'90%'}>
                <FormControl id='Stock_Code' isRequired color={'white'}>
                    <FormLabel>Stock_Code :</FormLabel>
                    <Input type='text' placeholder='Enter Stock_Code' onChange={(e) => setStock_Code(e.target.value)} />
                </FormControl>
                <FormControl id='Start_Date' isRequired color={'white'}>
                <FormLabel>Start_Date :</FormLabel>
                    <Input type='datetime-local' placeholder='Enter Start_Date' onChange={(e) => setStart_Date(e.target.value)} />
                </FormControl>
                <FormControl id='End_Date' isRequired color={'white'}>
                <FormLabel>End_Date :</FormLabel>
                    <Input type='datetime-local' color={'white'} placeholder='Enter End_Date' onChange={(e) => setEnd_Date(e.target.value)} />
                </FormControl>
                <Button  size='md' onClick={handleSubmit} isLoading={loading}>
                    Predict
                </Button>
            </VStack>
        </Box>
    )
}

export default StockData
