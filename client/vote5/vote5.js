import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote5.html';


Template.vote5.onCreated(function vote5OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));

   this.name = new ReactiveVar("");
   this.totCnt = new ReactiveVar("");
   this.regCnt = new ReactiveVar("");   
   this.voteFlag = new ReactiveVar(""); 
   this.canFlag = new ReactiveVar("");  
   this.balAddr = new ReactiveVar(""); 
   this.voteAddr = new ReactiveVar("");  
   this.qrcodeUrlText = new ReactiveVar("");   
});

Template.vote5.helpers({
  name() {
    return   Template.instance().name.get();  
  },
  totCnt() {
    return   Template.instance().totCnt.get();  
  },
  regCnt() {
    return   Template.instance().regCnt.get();  
  },
  voteFlag() {
    return   Template.instance().voteFlag.get();  
  },
  canFlag() {
    return   Template.instance().canFlag.get();  
  },    
  balAddr() {
    return   Template.instance().balAddr.get();  
  },
  voteAddr() {
    return   Template.instance().voteAddr.get();  
  },  
  qrcodeUrlText() {
    return   Template.instance().qrcodeUrlText.get();   
  },
  qrcodeList() {

    MyTestS   = web3.eth.contract(vote.abi);    // unlock
 
    // initiate contract for an address
    var MyTestInsS = MyTestS.at(Template.instance().voteAddr.get());

    //  setvoteend function
    var qrcodeList=[{}];
    for(var i=0;i<110;i++) {
                console.log("num"+i);
      var url = MyTestInsS.getVoter(i, function(e,r) { console.log(r)});
   
     } 
     console.log(qrcodeList);
     return qrcodeList;
   }  
});

Template.vote5.events({
  'click button#getBallot' (event, instance ) {

    var UrlText = qrurl+document.getElementById('getVoteAddr').value+"/"+document.getElementById('getBalAddr').value;

    instance.balAddr.set(document.getElementById('getBalAddr').value);
    instance.voteAddr.set(document.getElementById('getVoteAddr').value);
    instance.qrcodeUrlText.set(UrlText);
    console.log(UrlText);
  } ,
  'click button#getallBallot' (event, instance ) {

    instance.voteAddr.set(document.getElementById('getVoteAddr').value);
    console.log(document.getElementById('getVoteAddr').value);
  }                                                                  
});

/*
Template.vote5.events({
  'click button#getBallot' (event, instance ) {

    MyVote   = web3.eth.contract(ballot.abi);

    // initiate contract for an address
    var MyVoteIns = MyVote.at(document.getElementById('getBalAddr').value);

    // 선거명
    //MyVoteIns.getVoteNm( function(e,r) {
    //                       console.log(r);
    //                       instance.name.set(r); 
    //                    });  

    var googleqr="https://chart.apis.google.com/chart?cht=qr&chs=200&choe=UTF-8&chld=H10";
    var qrurl = "http://192.168.1.5:3000/ballot/"+document.getElementById('getBalAddr').value;
    var qrchl = googleqr+"&chl="+ encodeURIComponent(qrurl);

    instance.balAddr.set(document.getElementById('getBalAddr').value);

    console.log(qrchl);

    var imgtag = document.createElement("img");

    imgtag.setAttribute("id","qrcodeimg");
    
    imgtag.setAttribute("src",qrchl);
    //imgtag.setAttribute("style","display:none;");

    document.getElementById('qr_result').removeChild(document.getElementById('qrcodeimg'));

    document.getElementById('qr_result').appendChild(imgtag);
    console.log(imgtag);
  }                                                                  
}); */