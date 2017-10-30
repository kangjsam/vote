//rpcServer = "http://112.175.184.204:8545";
//qrurl = "http://112.175.184.204:3000/ballot/";

rpcServer = "http://192.168.1.2:8545";
qrurl  = "http://192.168.1.2:3000/ballot/";
qrurl1 = "http://192.168.1.2:3000/ballot/";
qrurl2 = "http://192.168.1.2:3000/ballot/";
qrurl3 = "http://192.168.1.2:3000/ballot/";

vote = {};
vote.address ="";
// abi
vote.abi=[{"constant":false,"inputs":[{"name":"w","type":"uint256"}],"name":"setVoteTotCnt","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getVoteNm","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVoterCnt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint8"}],"name":"setCanVoteCnt","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"setVoterCnt","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint8"},{"name":"cName","type":"string"}],"name":"setCanReg","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"Name","type":"string"}],"name":"setInitVote","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getVoteFlag","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVoteTotCnt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"seq","type":"uint256"},{"name":"BallotAddr","type":"address"}],"name":"setVoterReg","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"seq","type":"uint256"}],"name":"getVoter","outputs":[{"name":"BallotAddr","type":"address"},{"name":"CanNo","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nVoteFlag","type":"uint256"}],"name":"setVoteFlag","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"Num","type":"uint8"}],"name":"getCanVoteCnt","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCanCnt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"seq","type":"uint256"},{"name":"CanNo","type":"uint256"}],"name":"setVoterRlt","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"Num","type":"uint8"}],"name":"getCanNm","outputs":[{"name":"Name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

//bytecode  
vote.byteCode ="0x60606040526000600755341561001457600080fd5b610b14806100236000396000f3006060604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806340243da3146100eb5780634720c3391461010357806364e2393a146101915780638662dc03146101ba5780638dbd6268146101d5578063947c56a3146101df578063a1ec3a761461023d578063aaedfe201461028f578063ae52ab53146102b8578063c76a39f0146102e1578063d07bff0c14610318578063d4afa18714610382578063d5e4c6be1461039a578063de642e27146103da578063e7f4d0a814610403578063eaed8a9114610424575b600080fd5b61010160048080359060200190919050506104c3565b005b341561010e57600080fd5b6101166104e6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561015657808201518184015260208101905061013b565b50505050905090810190601f1680156101835780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561019c57600080fd5b6101a4610590565b6040518082815260200191505060405180910390f35b6101d3600480803560ff1690602001909190505061059c565b005b6101dd610600565b005b61023b600480803560ff1690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610614565b005b61028d600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107c1565b005b341561029a57600080fd5b6102a2610819565b6040518082815260200191505060405180910390f35b34156102c357600080fd5b6102cb610825565b6040518082815260200191505060405180910390f35b610316600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610831565b005b341561032357600080fd5b61033960048080359060200190919050506108a6565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6103986004808035906020019091905050610900565b005b34156103a557600080fd5b6103be600480803560ff1690602001909190505061090d565b604051808260ff1660ff16815260200191505060405180910390f35b34156103e557600080fd5b6103ed610940565b6040518082815260200191505060405180910390f35b610422600480803590602001909190803590602001909190505061094c565b005b341561042f57600080fd5b610448600480803560ff1690602001909190505061096b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561048857808201518184015260208101905061046d565b50505050905090810190601f1680156104b55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600160006003015414156104e35780600060010154016000600101819055505b50565b6104ee610a2f565b600080018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105865780601f1061055b57610100808354040283529160200191610586565b820191906000526020600020905b81548152906001019060200180831161056957829003601f168201915b5050505050905090565b60008060020154905090565b6001600560008360ff1660ff16815260200190815260200160002060010160009054906101000a900460ff1601600560008360ff1660ff16815260200190815260200160002060010160006101000a81548160ff021916908360ff16021790555050565b600160006002015401600060020181905550565b6001600560008460ff1660ff16815260200190815260200160002060010160019054906101000a900460ff1660ff1614151561078b5760008260ff1614156106665760016000600401819055506106e9565b6001600560006001850360ff1660ff16815260200190815260200160002060010160019054906101000a900460ff1660ff161480156106d257506001600560008460ff1660ff16815260200190815260200160002060010160019054906101000a900460ff1660ff1614155b156106e8576001820160ff166000600401819055505b5b80600560008460ff1660ff1681526020019081526020016000206000019080519060200190610719929190610a43565b506000600560008460ff1660ff16815260200190815260200160002060010160006101000a81548160ff021916908360ff1602179055506001600560008460ff1660ff16815260200190815260200160002060010160016101000a81548160ff021916908360ff1602179055506107bd565b80600560008460ff1660ff16815260200190815260200160002060000190805190602001906107bb929190610a43565b505b5050565b6000600754141561080e5760008060010181905550806000800190805190602001906107ee929190610a43565b506000806003018190555060008060020181905550600080600401819055505b600160078190555050565b60008060030154905090565b60008060010154905090565b806006600084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060066000848152602001908152602001600020600101819055505050565b6000806006600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060066000848152602001908152602001600020600101549050915091565b8060006003018190555050565b6000600560008360ff1660ff16815260200190815260200160002060010160009054906101000a900460ff169050919050565b60008060040154905090565b8060066000848152602001908152602001600020600101819055505050565b610973610a2f565b600560008360ff1660ff1681526020019081526020016000206000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a235780601f106109f857610100808354040283529160200191610a23565b820191906000526020600020905b815481529060010190602001808311610a0657829003601f168201915b50505050509050919050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a8457805160ff1916838001178555610ab2565b82800160010185558215610ab2579182015b82811115610ab1578251825591602001919060010190610a96565b5b509050610abf9190610ac3565b5090565b610ae591905b80821115610ae1576000816000905550600101610ac9565b5090565b905600a165627a7a72305820b4d17c457cbe55f265e123befbe4eb7533ffb5605606528f638c63759e8a4b3e0029"; 


ballot = {};

ballot.address = "";
// abi ballot
ballot.abi  =[{"constant":false,"inputs":[{"name":"VoteAddr","type":"address"},{"name":"i","type":"uint8"}],"name":"CastBallot","outputs":[{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"VoteAddr","type":"address"},{"name":"BallotAddr","type":"address"},{"name":"SerialNo","type":"uint256"}],"name":"setInitBallot","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getWeight","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];


//bytecode  
ballot.byteCode ="0x6060604052341561000f57600080fd5b6106e38061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d3398731461005c57806393d1a9ed1461010f578063a9b4b78014610165575b600080fd5b610094600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560ff1690602001909190505061018e565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100d45780820151818401526020810190506100b9565b50505050905090810190601f1680156101015780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610163600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610465565b005b341561017057600080fd5b610178610697565b6040518082815260200191505060405180910390f35b6101966106a3565b600083905060018173ffffffffffffffffffffffffffffffffffffffff1663aaedfe206000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561020957600080fd5b6102c65a03f1151561021a57600080fd5b50505060405180519050148015610235575060008060020154115b15610425578073ffffffffffffffffffffffffffffffffffffffff166340243da36000600201546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15156102ad57600080fd5b6102c65a03f115156102be57600080fd5b5050508073ffffffffffffffffffffffffffffffffffffffff16638662dc03846040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260ff1660ff168152602001915050600060405180830381600087803b151561033557600080fd5b6102c65a03f1151561034657600080fd5b5050508073ffffffffffffffffffffffffffffffffffffffff1663e7f4d0a8600060010154600186016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018260ff16815260200192505050600060405180830381600087803b15156103ca57600080fd5b6102c65a03f115156103db57600080fd5b505050600080600201819055506040805190810160405280600181526020017f5900000000000000000000000000000000000000000000000000000000000000815250915061045e565b6040805190810160405280600181526020017f4e0000000000000000000000000000000000000000000000000000000000000081525091505b5092915050565b600083905060008173ffffffffffffffffffffffffffffffffffffffff1663aaedfe206000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156104d857600080fd5b6102c65a03f115156104e957600080fd5b505050604051805190501480156105065750600160006002015414155b1561069157836000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600060020181905550816000600101819055508073ffffffffffffffffffffffffffffffffffffffff16638dbd62686040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b15156105c657600080fd5b6102c65a03f115156105d757600080fd5b5050508073ffffffffffffffffffffffffffffffffffffffff1663c76a39f083856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b151561067c57600080fd5b6102c65a03f1151561068d57600080fd5b5050505b50505050565b60008060020154905090565b6020604051908101604052806000815250905600a165627a7a72305820348291f88382d8daea54811f92b4a73eff21c3ace0c864141314bcf9bbd43bf70029";

