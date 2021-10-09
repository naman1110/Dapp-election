import React, { Component } from "react";
import election from "./contracts/election.json";
import getWeb3 from "./getWeb3";

import "./App.css";
var val,vt,wi,p,select,v;
class App extends Component {
  state = { candidate:[] ,loaded:false,owner:" ..",wi:".. "};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
     this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
     this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
     this.networkId = await this.web3.eth.net.getId();
      
     this.instance = new this.web3.eth.Contract(
        election.abi,
        election.networks[this.networkId]&& election.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
     this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

addr=async(event)=>{
 val =event.target.value;
let h=await this.instance.methods.own().call();
   p=await this.instance.methods.peple().call();
   this.setState({owner:h});
}
 register = async () => {await this.instance.methods.register(val).send({from: this.accounts[0]});
 
   this.setState(state=>{
           const candidate = [...state.candidate, val];

return {candidate};

   });
 

    
  };
  /*   votaddr=async(event)=>{
vt=event.target.value;
   }*/

      winner=async()=>{
    
    let w=await this.instance.methods.winner().call();
    this.setState({wi:w}) ; 
    alert(`winner is ${w}`);
       
      }
      select=async(event)=>{vt = event.target.value;
         v=vt.substring(1,2);
                            console.log(v);}

vote =async()=>{await this.instance.methods.vote(vt).send({from: this.accounts[0]});}


    render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Election Booth</h1>
        <h2>Register the candidate:- <input type="text" onChange={this.addr} placeholder="0000x0...." ></input></h2>
        <h3> owner address:{this.state.owner}</h3>
        <p>no. of candidate to be Registered is {p}</p>
        {/*<button onClick={this.register}>Register</button>*/}


         <a onClick ={this.register} href="#" className="cta">
         <span >Register</span>
         <svg width="13px" height="10px" viewBox="0 0 13 10">
         <path d="M1,5 L11,5"></path>
         <polyline points="8 1 12 5 8 9"></polyline>
         </svg>
         </a>


      <h4>Registered Candidates</h4>
        <select  onChange={this.select}>
             <option>Select candidate</option>
          {this.state.candidate.map((item,i) => (
            <option  value={item}  >Candiate {i+1} (.....){v}</option>
          ))}
        </select>
        <br></br>
        <br></br>
        <br></br>


        <a onClick ={this.vote} href="#" className="cta">
         <span >Vote</span>
         <svg width="13px" height="10px" viewBox="0 0 13 10">
         <path d="M1,5 L11,5"></path>
         <polyline points="8 1 12 5 8 9"></polyline>
         </svg>
         </a>



         <a onClick ={this.winner} href="#" className="cta">
         <span >Winner</span>
         <svg width="13px" height="10px" viewBox="0 0 13 10">
         <path d="M1,5 L11,5"></path>
         <polyline points="8 1 12 5 8 9"></polyline>
         </svg>
         </a>
       
          

       <p className="win">Winner is :- {this.state.wi}</p>
       
      </div>
    );
  }
}

export default App;
