// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
    
contract election{
        
        uint256 public votecount;
        address public owner;
        uint256 public people;
        mapping (address=>uint256) candidate;
        mapping (address=>bool) voting;
        address[] public standing;
      
     
        constructor(uint256 no){
            owner=msg.sender;
            people=no;
            
        }
     
        function register(address addr) public{
            require(msg.sender==owner,"Not owner ");
            candidate[addr]=0;
            standing.push(addr);
         
            }
        function vote(address add)  public  {
            require(!voting[msg.sender],"Already voted");
            candidate[add]+=1;
            voting[msg.sender]=true;
            
        }
        function peple() public view returns(uint256){
            return people;
        }
        function own() public returns(address) {
            return owner;
        }
        function winner() public view  returns(address winneraddress){
                uint256  h= 0;
             require(msg.sender==owner,"Not owner ");
             for(uint256 i=0;i<people;i++){
                 
           
                if(candidate[standing[i]]>h){
                    h=candidate[standing[i]];
                    winneraddress=standing[i];
                    
                }
                 
             }
           
        }
        
    }