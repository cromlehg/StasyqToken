pragma solidity ^0.4.18;

import './StagedCrowdsale.sol';
import './StasyqToken.sol';

contract CommonSale is StagedCrowdsale {

  address public masterWallet;

  address public slaveWallet;

  address public directMintAgent;

  uint public slaveWalletPercent;

  uint public percentRate = 100;

  uint public minPrice;

  uint public totalTokensMinted;

  StasyqToken public token;

  modifier onlyDirectMintAgentOrOwner() {
    require(directMintAgent == msg.sender || owner == msg.sender);
    _;
  }

  function setDirectMintAgent(address newDirectMintAgent) public onlyOwner {
    directMintAgent = newDirectMintAgent;
  }

  function setMinPrice(uint newMinPrice) public onlyOwner {
    minPrice = newMinPrice;
  }

  function setMasterWallet(address newMasterWallet) public onlyOwner {
    masterWallet = newMasterWallet;
  }

  function setToken(address newToken) public onlyOwner {
    token = StasyqToken(newToken);
  }

  function directMint(address to, uint investedWei) public onlyDirectMintAgentOrOwner saleIsOn {
    mintTokens(to, investedWei);
  }

  function createTokens() public whenNotPaused payable {
    require(msg.value >= minPrice);
    uint masterValue = msg.value.mul(percentRate.sub(slaveWalletPercent)).div(percentRate);
    uint slaveValue = msg.value.sub(masterValue);
    masterWallet.transfer(masterValue);
    slaveWallet.transfer(slaveValue);
    mintTokens(msg.sender, msg.value);
  }

  function mintTokens(address to, uint weiInvested) internal {
    uint stageIndex = currentStage();
    Stage storage stage = stages[stageIndex];
    uint tokens = weiInvested.mul(stage.price);
    token.mint(this, tokens);
    token.transfer(to, tokens);
    totalTokensMinted = totalTokensMinted.add(tokens);
    totalInvested = totalInvested.add(weiInvested);
    stage.invested = stage.invested.add(weiInvested);
    if (stage.invested >= stage.hardcap) {
      stage.closed = now;
    }
  }

  function() external payable {
    createTokens();
  }

  function retrieveTokens(address anotherToken, address to) public onlyOwner {
    ERC20 alienToken = ERC20(anotherToken);
    alienToken.transfer(to, alienToken.balanceOf(this));
  }


}

