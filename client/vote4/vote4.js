import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote4.html';

Template.vote4.onCreated(function vote4OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));
   
   this.balAddr = new ReactiveVar("");
   this.serialNo = new ReactiveVar(0); 
});

Template.vote4.helpers({
  balAddr() {
    return   Template.instance().balAddr.get();
  },
  serialNo() {
    return   Template.instance().serialNo.get();
  },
});

Template.vote4.events({
    'click button#createBallot' (event, instance ) {

    // unlock
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');
    
    //vote contract 
    var vote1_ballotContract = web3.eth.contract(ballot.abi);
    var vote1_ballot = vote1_ballotContract.new(
       {
         from: web3.eth.accounts[0], 
         data: ballot.byteCode, 
         gas: '4700000'
       }, function (e, contract){
        console.log (e);
 
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            instance.balAddr.set( contract.address);
            instance.serialNo.set( instance.serialNo.get()+1);
        }
        });
    },
    'click button#regBallot' (event, instance ) {

    MyVote   = web3.eth.contract(ballot.abi);
    // unlock
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');
    
    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('getBallot').value);
    
    //  setvoteend function
    MyVoteIns.setInitBallot(
        document.getElementById('setVote').value,
        document.getElementById('getBallot').value,
        document.getElementById('setSerial').value-1,
        {
          from:web3.eth.accounts[0], 
          gas:1000000
        }, 
        function(e,r) {
            console.log("reg"+r);
        }); 
    }
});
