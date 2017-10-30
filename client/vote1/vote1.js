import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote1.html';


Template.vote1.onCreated(function vote1OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));
   
   this.cntrAddr = new ReactiveVar("");
   this.cntrName = new ReactiveVar("");
   this.txHash1 = new ReactiveVar("");
   this.txHash2 = new ReactiveVar("");   
});

Template.vote1.helpers({
  cntrAddr() {
    return   Template.instance().cntrAddr.get();
  },
  txHash1() {
    return   Template.instance().txHash1.get();  
  },
  txHash2() {
    return   Template.instance().txHash2.get();  
  },
});

Template.vote1.events({
  'click button#createvote' (event, instance ) {
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');

    //vote contract 
    var vote1_sol_voteContract = web3.eth.contract(vote.abi);
    var vote1_sol_vote = vote1_sol_voteContract.new(
    {
     from: web3.eth.accounts[0], 
     data : vote.byteCode,
     gas: '4700000'
    }, function (e, contract){
    console.log(e, contract);
    instance.txHash1.set( contract.transactionHash); 
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
         instance.cntrAddr.set( contract.address);
    }
    });
  },
  'click button#regvote' (event, instance ) {

    MyVote   = web3.eth.contract(vote.abi);
    // unlock
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');
    
    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('getVote').value);
    
    //  setvoteend function
    MyVoteIns.setInitVote(document.getElementById('setVoteNm').value,
                      {from:web3.eth.accounts[0] ,gas:1000000}, 
                      function(e,r) {
                              console.log("reg"+r);
                      instance.txHash2.set( r); 
  }); 
  }
});
