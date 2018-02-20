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
* _Bounty tokens wallet_        : 0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836
* _Founders tokens lock period_ : 90 days
* _Hardcap_                     : 20 000 ETH
* _Price_                       : 10 000 STQ
* _Period_                      : 60 days
* _Start_                       : 03 May 2018 13:00:00 GMT
* _Master wallet_               : 0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836
* _Slave wallet_                : 0x8029618Ecb5445B73515d7C51AbB316A91FC7f23
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

## Ropsten network configuration 

### links
1. _Token_ - https://ropsten.etherscan.io/address/0x036ccafb7c8cf9f6bbe28018dda23249c1d1a6cb
2. _ITO_ - https://ropsten.etherscan.io/address/0xb510ed5252664335de2a72d876bb12e0e8303230
3. _CallbackTest_ - https://ropsten.etherscan.io/address/0x1381250bc1f6a001b720335542b96dba427225d2

### ITO

* _Minimal investment limit_    : 0.1 ETH
* _Bounty tokens percent_       : 5%
* _Founders tokens percent_     : 25%
* _For sale tokens percent_     : 70%
* _Founders tokens lock period_ : 90 days
* _Period_                      : 60 days
* _Start_                       : 20 Feb 2018 00:00:00 GMT
* _Master wallet percent_       : 50%
* _Slave wallet percent_        : 50%
* _Founders tokens wallet_      : 0x95EA6A4ec9F80436854702e5F05d238f27166A03
* _Bounty tokens wallet_        : 0x6715Feb90B78d4d7aD92FbaCA7Fd70481e12f836
* _Master wallet_               : 0x093A89bDb5CE905fecb6272ff3ac92f53350a79A
* _Slave wallet_                : 0x470a2D1105EaE6aAe879623357F615Ab9cbf906E

_Milestones_
 1. Hardcap 2 ETH, price 14500 STQ per ETH (bonus +45%)
 2. Hardcap 2 ETH, price 14000 STQ per ETH (bonus +40%)
 3. Hardcap 2 ETH, price 13500 STQ per ETH (bonus +35%)
 4. Hardcap 2 ETH, price 13000 STQ per ETH (bonus +30%)
 5. Hardcap 2 ETH, price 12500 STQ per ETH (bonus +25%)
 6. Hardcap 2 ETH, price 12000 STQ per ETH (bonus +20%)
 7. Hardcap 2 ETH, price 11500 STQ per ETH (bonus +15%)
 8. Hardcap 2 ETH, price 11000 STQ per ETH (bonus +10%)
 9. Hardcap 2 ETH, price 10500 STQ per ETH (bonus  +5%)
10. Hardcap 2 ETH, price 10000 STQ per ETH (bonus   0%)


##### Purchasers

* 1.1 ETH => 15950 tokens, gas = 215657
https://ropsten.etherscan.io/tx/0x11822e63e1985fb2610a051f74b2da9d75a002334b481bb6c500f7c29020f47d

* 0.01 ETH => rejected txn, less then mininal investment limit, gas = 21594
https://ropsten.etherscan.io/tx/0x0c44dee9b09f62c3492c3689dbda62ea4a15e8a1f8eada1b9c5acbe96d763510

* 1 ETH => 14500 tokens, gas = 110668
https://ropsten.etherscan.io/tx/0x42bebc1486b6c5cde3589b471f6b84196930a67a528e5cc4259895027053b7f7

* 0.1 ETH => 1400 tokens, gas = 106426
https://ropsten.etherscan.io/tx/0x451a34dea20e156a43abd52c6bb0742c9ec15e62a507fed8fd8770e2e3ec2972

* 0.1 ETH => rejected txn, paused, gas = 21369
https://ropsten.etherscan.io/tx/0x7228eaebcf62b9ccc20255261950a06ff3927f8f371f8d63ba538d187c70b371

* 0.1 ETH => 1400 tokens, gas = 91426
https://ropsten.etherscan.io/tx/0x225b6ad53e24d591752f850cc32458e2bf2fe66470250e43ecd955bbe90f477b

##### Service operations

* setToken, gas = 43663
https://ropsten.etherscan.io/tx/0x9f8adca5d54fe57105542989f65b0aba1b2c3da98539e10992b56aa30bfbb675

* SetSaleAgent, gas = 43598
https://ropsten.etherscan.io/tx/0xa8d5d6e43a55d6fe6d310144837011853b2f106a915b130de8f67c9aac2ab0e3

* registerCallback, gas = 43956
https://ropsten.etherscan.io/tx/0xcebfba06663fc4e2ae232e86e515aad452c6019df111a1df36a081ecda6ca3c3

* transfer 1 token, gas = 95730
https://ropsten.etherscan.io/tx/0x88d428efee384790e62ac13d073115506cabb1e9ddc8f2e2d4850846ff53ce62

* pause, gas = 28661
https://ropsten.etherscan.io/tx/0x3cb19e40e9160dac4ee34bf9fbe5dde7900f39c91594ab1ee7a7a9f00cfdc63e

* unpause, gas = 28221
https://ropsten.etherscan.io/tx/0x6b92069c38873368cf7c71859bd7b99328ac75c5d1b951ae587f137edf7bcae9

* finishMinting, gas = 163280
https://ropsten.etherscan.io/tx/0xc094392f3cad591dea74dc73d35be1f3322fc0d851029e05bafd8da154ee691d

##### Token holders
https://ropsten.etherscan.io/token/0x036ccafb7c8cf9f6bbe28018dda23249c1d1a6cb#balances
