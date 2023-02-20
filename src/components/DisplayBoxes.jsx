import { toNumber } from 'ethers';
import React, { useState, useEffect} from 'react';
import ReviewsBar from '../components/progressbar/reviewsBar';




const DisplayBoxes = (props) => {
   
    // usestate for the progress and rewiewsBar component
    const [rewiewScore, setRewiewScore] = useState(35.66);


        



    //APi Point endpoint consumables 

    const [price, setPrice] = useState("");
    const [marketCap, setMarketCap] = useState();
    const [volume, setVolume] = useState();
    const [priceChange, setPriceChange] = useState();
    
    
    useEffect(() => {
        fetch('https://api.dexscreener.com/latest/dex/tokens/0x5a79be6cdce26bc853d72919bf98a0378641b607')
           .then((response) => response.json())
           .then((data) => {
            //   console.log(data);
              setPrice(data.pairs[0].priceUsd);
              setMarketCap(Math.round(data.pairs[0].priceUsd * 643940000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
              setVolume(data.pairs[0].volume.h24)
              setPriceChange(data.pairs[0].priceChange.h24);

            
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    
     useEffect(() => {
        fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x5a79be6cdce26bc853d72919bf98a0378641b607&address=0x000000000000000000000000000000000000dEaD&tag=latest&apikey=2KBH34YNQ4QHV4E5RHF5Y4QBCDWG5RJ5IP')
           .then((response) => response.json())
           .then((BurnData) => {
             
             console.log(BurnData);

            //  setRewiewScore(n);
             
             
              
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);
    

    return (
        <div className='container center'>
        <div className='price-box'>
            <p className='price-box-text'>Price:</p>
            <div className='price'>
                <h1>${price}</h1>
                <p>({priceChange})</p>
          </div>
            
    </div>
        <div className='price-box'>
            <p className='price-box-text'>Marketcap:</p>
            <div className='price'>
                <h1>${marketCap}</h1>
                {/* <p>( -9%)</p> */}
            </div>
            
        </div>
        <div className='price-box'>
            <p className='price-box-text'>24h Volume:</p>
            <div className='price'>
                <h1>${volume}</h1>
                <p>( {priceChange}%)</p>
            </div>
        </div>
        <div className='price-box'>
            <p className='burn-goal'>Total token Burn: </p>
            <div className='chart-container'>
                <div className='row mt-3'>
                <div className='row mt-2'>
                    <ReviewsBar score={rewiewScore} />
                </div>
                
                </div>
                
            </div>
        </div>
    </div>
    );
};


export default DisplayBoxes;