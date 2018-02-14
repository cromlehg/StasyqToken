pragma solidity ^0.4.18;

import './CommonSale.sol';
import './StasyqToken.sol';

contract ITO is CommonSale {

  StasyqToken public token;

  address public foundersTokensWallet;

  address public bountyTokensWallet;

  uint public foundersTokensPercent;

  uint public bountyTokensPercent;

  uint public lockPeriod;

  function ITO() public {
    addStage(2000,14500);
    addStage(2000,14000);
    addStage(2000,13500);
    addStage(2000,13000);
    addStage(2000,12500);
    addStage(2000,12000);
    addStage(2000,11500);
    addStage(2000,11000);
    addStage(2000,10500);
    addStage(2000,10000);
    masterWallet = 0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836;
    slaveWallet = 0x8029618Ecb5445B73515d7C51AbB316A91FC7f23;
    slaveWalletPercent = 50;
    foundersTokensWallet = 0x95EA6A4ec9F80436854702e5F05d238f27166A03;
    bountyTokensWallet = 0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836;
    start = 1525352400;
    period = 60;
    lockPeriod = 90;
    minPrice = 100000000000000000;
    foundersTokensPercent = 25;
    bountyTokensPercent = 5;
  }

  function setLockPeriod(uint newLockPeriod) public onlyOwner {
    lockPeriod = newLockPeriod;
  }

  function setFoundersTokensPercent(uint newFoundersTokensPercent) public onlyOwner {
    foundersTokensPercent = newFoundersTokensPercent;
  }

  function setBountyTokensPercent(uint newBountyTokensPercent) public onlyOwner {
    bountyTokensPercent = newBountyTokensPercent;
  }

  function setFoundersTokensWallet(address newFoundersTokensWallet) public onlyOwner {
    foundersTokensWallet = newFoundersTokensWallet;
  }

  function setBountyTokensWallet(address newBountyTokensWallet) public onlyOwner {
    bountyTokensWallet = newBountyTokensWallet;
  }

  function finishMinting() public whenNotPaused onlyOwner {
    uint summaryTokensPercent = bountyTokensPercent.add(foundersTokensPercent);
    uint mintedTokens = token.totalSupply();
    uint totalSupply = mintedTokens.mul(percentRate).div(percentRate.sub(summaryTokensPercent));
    uint foundersTokens = totalSupply.mul(foundersTokensPercent).div(percentRate);
    uint bountyTokens = totalSupply.mul(bountyTokensPercent).div(percentRate);
    token.mint(this, foundersTokens);
    token.lock(foundersTokensWallet, lockPeriod * 1 days);
    token.transfer(foundersTokensWallet, foundersTokens);
    token.mint(this, bountyTokens);
    token.transfer(bountyTokensWallet, bountyTokens);
    totalTokensMinted = totalTokensMinted.add(foundersTokens).add(bountyTokens);
    token.finishMinting();
  }

}
