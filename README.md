![StasyqToken](logo.jpg "StasyqToken")

# StasyqToken smart contract

* _Standart_        : ERC20
* _Name_            : StasyqToken
* _Ticket_          : STQ
* _Decimals_        : 18
* _Emission_        : Mintable
* _Crowdsales_      : 2
* _Fiat dependency_ : No
* _Tokens locked_   : Yes

## Smart-contracts description

Contract mint bounty and founders tokens after main sale stage finished. 
Crowdsale contracts have special function to retrieve transferred in errors tokens.
Also crowdsale contracts have special function to direct mint tokens in wei value (featue implemneted to support external pay gateway).

### Contracts contains
1. _StasyqToken_ - Token contract
3. _ITO_ - ITO contract

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _directMint_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distibution

Maximum tokens can mint - 350 000 000 STQ 
* For purchasers : 70% or maximum 245 000 000 STQ
* For founders : 25% or maximum 87 500 000 STQ 
* For bounty : 5% or maximum 17 500 000 STQ

## Initial Token Offering

* _Minimal insvested limit_     : 0.1 ETH
* _Bounty tokens percent_       : 5%
* _Founders tokens percent_     : 25%
* _For sale tokens percent_     : 70%
* _Founders tokens wallet_      : 0x95EA6A4ec9F80436854702e5F05d238f27166A03
* _Bounty tokens wallet_        : 0x95EA6A4ec9F80436854702e5F05d238f27166A03
* _Founders tokens lock period_ : 90 days
* _Hardcap_                     : 20 000 ETH
* _Price_                       : 10 000 STQ
* _Period_                      : 60 days
* _Start_                       : 
* _Master wallet_               : 0x95EA6A4ec9F80436854702e5F05d238f27166A03
* _Slave wallet_                : 0x070EcC35a3212D76ad443d529216a452eAA35E3D
* _Master wallet percent_       : 50%
* _Slave wallet percent_        : 50%
* _Contract owner_              : 0x95EA6A4ec9F80436854702e5F05d238f27166A03

_Milestones_
 1. Hardcap 2000 ETH, price 14500 STQ per ETH (bonus +45%), summary ~29000000 STQ
 2. Hardcap 2000 ETH, price 14000 STQ per ETH (bonus +40%), summary ~28000000 STQ
 3. Hardcap 2000 ETH, price 13500 STQ per ETH (bonus +35%), summary ~27000000 STQ
 4. Hardcap 2000 ETH, price 13000 STQ per ETH (bonus +30%), summary ~26000000 STQ
 5. Hardcap 2000 ETH, price 12500 STQ per ETH (bonus +25%), summary ~25000000 STQ
 6. Hardcap 2000 ETH, price 12000 STQ per ETH (bonus +20%), summary ~24000000 STQ
 7. Hardcap 2000 ETH, price 11500 STQ per ETH (bonus +15%), summary ~23000000 STQ
 8. Hardcap 2000 ETH, price 11000 STQ per ETH (bonus +10%), summary ~22000000 STQ
 9. Hardcap 2000 ETH, price 10500 STQ per ETH (bonus  +5%), summary ~21000000 STQ
10. Hardcap 2000 ETH, price 10000 STQ per ETH (bonus   0%), summary ~20000000 STQ

### Links
1. _Token_ - 
2. _ITO_ - 


