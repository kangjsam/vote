import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote2.html';


Template.vote2.onCreated(function vote1OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));

   this.name = new ReactiveVar("");
   this.totCnt = new ReactiveVar("");
   this.regCnt = new ReactiveVar(""); 
   this.canCnt = new ReactiveVar("");
   this.voteFlag = new ReactiveVar(""); 
   this.canFlag = new ReactiveVar("");   
   this.txhash = new ReactiveVar("");  
});

Template.vote2.helpers({
  name() {
    return   Template.instance().name.get();  
  },
  totCnt() {
    return   Template.instance().totCnt.get();  
  },
  regCnt() {
    return   Template.instance().regCnt.get();  
  },
  canCnt() {
    return   Template.instance().canCnt.get();  
  },  
  voteFlag() {
    return   Template.instance().voteFlag.get();  
  },
  canFlag() {
    return   Template.instance().canFlag.get();  
  }, 
  txhash() {
    return   Template.instance().txhash.get();  
  }   
});

Template.vote2.events({
  'click button#getVoteAll' (event, instance ) {

    MyVote   = web3.eth.contract(vote.abi);

    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('VoteAccount').value);

    // 선거명
    MyVoteIns.getVoteNm( function(e,r) {
                           console.log(r);
                           instance.name.set(r); 
                        });  
    // 전체건수
    MyVoteIns.getVoteTotCnt( function(e,r) {
                           console.log(r);
                           instance.totCnt.set(r); 
                        }); 
    // 등록  후보자수
    MyVoteIns.getCanCnt( function(e,r) {
                           console.log(r);
                           instance.canCnt.set(r); 
                        }); 
    // 등록 유권자수
    MyVoteIns.getVoterCnt( function(e,r) {
                           console.log(r);
                           instance.regCnt.set(r); 
                        }); 
    // 선거상태flag
    MyVoteIns.getVoteFlag( function(e,r) {
                           console.log(r);
                           instance.voteFlag.set(r); 
                        }); 
  },
  'click button#setVoteStart' (event, instance ) {
     console.log("voteAccount:"+document.getElementById('VoteAccount').value );
    MyVote2   = web3.eth.contract(vote.abi);
    var MyVoteIns2 = MyVote2.at(document.getElementById('VoteAccount').value);

    // 선거명
    MyVoteIns2.setVoteFlag( 1 , {from:web3.eth.accounts[0] ,gas:1000000}, 
                            function(e,r) {
                              console.log("reg"+r);
                      instance.txhash.set( r); 
                        });   
     console.log("voteAccount2:"+document.getElementById('VoteAccount').value );                    
  }                                                                                     
});