import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote3.html';


Template.vote3.onCreated(function vote1OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));

   this.VoteCnt = new ReactiveVar("");
   this.Name = new ReactiveVar("");
});

Template.vote3.helpers({

  VoteCnt() {
    return   Template.instance().VoteCnt.get();  
  },
  Name() {
    return   Template.instance().Name.get();  
  },
});

Template.vote3.events({
    'click button#regCanNm' (event, instance ) {

    MyVote   = web3.eth.contract(vote.abi);
    // unlock
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');
    
    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('setVote').value);
    
    //  setvoteend function
    MyVoteIns.setCanReg(
        document.getElementById('setCanNo').value-1,
        document.getElementById('setCanNm').value,
        {
         from:web3.eth.accounts[0] ,gas:1000000
        }, 
        function(e,r) {
            console.log("reg"+r.transactionHash);
        }); 
    },
    'click button#getCanAll' (event, instance ) {

    MyVote   = web3.eth.contract(vote.abi);

    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('VoteAccount').value);

    // 득표건수
    var VoteCnt = MyVoteIns.getCanVoteCnt(document.getElementById('getCanNo').value-1 );  
    instance.VoteCnt.set(VoteCnt);  
    // 후보명
    var CanNm = MyVoteIns.getCanNm( document.getElementById('getCanNo').value-1); 
    instance.Name.set(CanNm);   
  }                                                                   
});