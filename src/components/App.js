import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Color from '../abis/Color.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    // load account
    const accounts = await web3.eth.getAccounts() 
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if (networkData) {
    const abi = Color.abi
    const address = networkData.address
    const contract = new web3.eth.Contract(abi, address)
    this.setState({ contract })
    const totalSupply = await contract.methods.totalSupply().call()
    this.setState({ totalSupply })
    
    for (var i = 1; i <= totalSupply; i++) {
      const color = await contract.methods.colors(i - 1).call()
      this.setState({
        colors: [...this.state.colors, color]
      })
    }
  console.log(this.state.colors);
    } else {
      window.alert('Smart contract not deployed to detected network.')
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        account: '',
        contract: null,
        totalSupply: 0,
        colors: []
      }
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">Account: {this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
               {

               }    
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            <p>tokens go here</p>
            </div>          
        </div>
      </div>
    );
  }
}

export default App;
