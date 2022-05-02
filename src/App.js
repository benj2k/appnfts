import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EyeBall from './artifacts/contracts/EyeBall.sol/EyeBall.json';
import './App.css';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';
import img8 from './img/8.png';
import img9 from './img/9.png';
import img10 from './img/10.png';

const EYBaddress = '0x8336eEC4545aFA295f22E69C5c1d7541Bb95600f'; // address du smart contract une fois déployé

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(EYBaddress, EyeBall.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost" : String(cost), "totalSupply": String(totalSupply)};
        setData(object);
      } catch(err) {
        setError(err.message);
      }
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="banniere">
          <img src={img1} alt="img" />
          <img src={img2} alt="img" />
          <img src={img3} alt="img" />
          <img src={img4} alt="img" />
          <img src={img5} alt="img" />
          <img src={img6} alt="img" />
          <img src={img7} alt="img" />
          <img src={img8} alt="img" />
          <img src={img9} alt="img" />
          <img src={img10} alt="img" />
        </div>
        { error && <p>{error}</p>}
        <h1> Mint a EyeBall NFT !</h1>
        <p className="count">{data.totalSupply} / 10</p>
        <p className="cost">Each EyeBall NFT costs {data.cost / 10 ** 18} eth (excluding gas fee)</p>
      </div>
    </div>
  );
}

export default App;
