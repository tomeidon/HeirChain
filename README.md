# HeirChain
Inheritance of cryptocurrency according to the will

### <a name="br1"></a>Web3@KAIST Proposal

[ Project Title ] Heir Chain : Inheritance of cryptocurrency according to the will

[ Project Type ] Option 1. Web3 app prototype

[ Team Name ] Kill Satoshin

[ Team Members ] 방시연(students), 김재성(auditors), 박주현(students)

[ Mentor ] 한재원


### Problem & Motivation

Death can come to anyone, assets within a blockchain wallet there is no way to recover, so there have been many cases
of losing huge assets.[1](#br1)[ ](#br1)The private key of the cryptocurrency cold wallet is complexly set to safely protect the user's
 assets, but in case of loss, there is no way to recover, so there have been many cases of losing huge assets.[2](#br1)


### Solution

To address this challenge, the proposed project aims to develop a cryptocurrency inheritance service for blockchain
wallet owners using a smart contract. The service will allow wallet owners to write a will, and in the event of sudden
death, the assets in the wallet will be transferred to the predetermined heir or charity.

Target: The target audience for this service is cryptocurrency wallet owners, estimated to be around 81 million.
Overview: The proposed solution involves the following steps:

(1) The wallet owner applies for the service and writes a will specifying the predetermined heir or charity.

(2) The smart contract checks the survival of the wallet owner every year.

(3) If the wallet owner's survival is not confirmed, a percentage of the remaining assets will be transferred to the
 predetermined heir or charity.

(4) The heir or charity becomes aware of the existence of the will and inheritance only at the moment of inheritance.


### Why Blockchain?

Blockchain technology enables the use of smart contracts to automate the process of checking the survival of the wallet
owner and transferring assets to the heir or charity. This provides transparency and eliminates the risk of losing assets.
Writing a will is difficult to access because it requires witnesses and complex procedures. However, this service is easily
accessible and user-friendly, making it convenient to use.


### Constraints & Details

\- The service will use a smart contract to check the survival of the wallet owner every year and send ERC-20 tokens
 of the Ethereum chain.

\- The owner can use the assets in the wallet until right before death. Therefore, after the death of the owner, assets
 will be inherited at a certain ratio from the remaining amount, rather than a certain amount. This ensures that the
 heir or charity receives a fair share of the remaining assets.

1 https://www.cbc.ca/news/canada/nova-scotia/quadriga-widow-jennifer-roberston-gerald-cotten-1.6318955

2 https://www.coolwallet.io/bitcoin-lost-private-key-horror-stories/

### deploy code
https://etherscan.io/address/0xbe4b368Fe3102e23B0207d2fb149f32EF7520e78#code
