import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  //State
  const [walletAddress, setWalletAddress] = useState(null)

  // Declare function
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!')

          // Check to connect to wallet
          const response = await solana.connect({onlyIfTrusted: true})
          // onlyIfTrusted: true 
          console.log(
            'Connected with public key!',
            response.publicKey.toString()
          )

          //Set user's publickey in state
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet')
      }
    } catch (error) {
      console.error(error)
    }
  }

  //For later
  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
      console.log('Connected with publicKey:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  //Render button if user not connected
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}>
      Connect to Wallet
    </button>
  )

  // Check connected wallet
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
