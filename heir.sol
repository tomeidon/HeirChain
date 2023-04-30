pragma solidity >=0.7.0 <0.9.0;

// 유언장 스마트 계약 : 어떤 할아버지가 돌아가시면서 증손자에게는 20 이더를, 증손녀에게는 10 이더를 주기로 했다면?
contract Will {
    // 확인 사항 3가지
    // 1. 할아버지가 정말로 돌아가셨는지, 2. 증여하는 유산은 어느 정도인지, 3. 증여자의 주소(지갑 주소)

    bool    deceased;
    uint    fortune;
    address owner;

    // 생성자 : Solidity 스마트 계약을 배포할 때 실행되는 특별한 함수로 생성자를 통해 오브젝트를 만든다. 초기값을 설정할 수 있다.
    // payable : 함수가 이더를 보내고 받을 수 있게 만든다.
    constructor() payable public {
        owner = msg.sender; // msg sender represents address that is being called
        fortune = msg.value; // msg value tells us how much ether is being sent
        deceased = false;
    }

    // 제어자(modifier) : 함수에 사용하는 애드온으로 추가적인 논리를 생성할 수 있게 한다. 조건문.
    // create modifier so that only person who can call the contract is the owner.
    modifier onlyOwner {
        require(msg.sender == owner);
        _; // 밑줄 문자를 입력하면 함수가 계속됨.
    }

    // 1. 할아버지가 정말로 돌아가셨는지
    // create modifier so that we only allocate funds if friend's gramps deceased  
    modifier mustBeDeceased {
        require(deceased == true);
        _;
    }

    // array : []
    // 3. 증여자의 주소(지갑 주소)
    // list of family wallets : 가족의 모든 지갑
    address payable[] familyWallets;

    // key-value
    // 2. 증여하는 유산은 어느 정도인지
    // map through inheritance : 누가 얼만큼의 유산을 받을지 기록되어 있음
    mapping(address => uint) inheritance;

    // set inheritance for each address : 누가 얼만큼의 유산을 받을지 설정
    function setInheritance(address payable wallet, uint amount) public {
        // to add wallets to the family wallets : .push
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    }     

    // pay each family member based on their wallet address
    function payout() private mustBeDeceased {
        // with a for loop you can loop through things and set conditions
        for(uint i=0; i<familyWallets.length; i++) {
            // transfering the funds contract address to receiver address
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
        }
    }
}