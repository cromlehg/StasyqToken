pragma solidity ^0.4.18;

import './MintableToken.sol';
import './ReceivingContractCallback.sol';

contract StasyqToken is ReceivingContractCallback, MintableToken {	
    
  string public constant name = "Stasyq";
   
  string public constant symbol = "STQ";
    
  uint32 public constant decimals = 18;

  mapping (address => uint) public locked;

  mapping(address => bool)  public registeredCallbacks;

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(locked[msg.sender] < now);
    return super.transfer(_to, _value);
  }

  function transferFrom(address from, address to, uint256 value) public notLocked returns (bool) {
    require(locked[_from] < now);
    return processCallback(super.transferFrom(from, to, value), from, to, value);
  }
  
  function lock(address addr, uint periodInDays) public {
    require(locked[addr] < now && (msg.sender == saleAgent || msg.sender == addr));
    locked[addr] = now + periodInDays * 1 days;
  }

  function registerCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = true;
  }

  function deregisterCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = false;
  }

  function processCallback(bool result, address from, address to, uint value) internal returns(bool) {
    if (result && registeredCallbacks[to]) {
      ReceivingContractCallback targetCallback = ReceivingContractCallback(to);
      targetCallback.tokenFallback(from, value);
    }
    return result;
  }

}