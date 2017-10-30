import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './vote7.html';


Template.vote7.onCreated(function vote6OnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer));

   this.voteAddr = new ReactiveVar("");  
   this.qrcodeUrlText = new ReactiveVar("");   
});

Template.vote7.helpers({
  qrcodeUrlText() {
    return   Template.instance().qrcodeUrlText.get();   
  },
  qrcodeList() {

    MyTestS   = web3.eth.contract(vote.abi);    // unlock
 
    // initiate contract for an address
    var MyTestInsS = MyTestS.at("0xbc23d48d6f57e60960aa27da2bf84b93433d798e");
    var url = "";
    //  setvoteend function
    var url1 = "http://112.175.184.203:3000/ballot/0x7f0b7d1e4e88c9b7f43e66078987f6561dbd3c7f/";
    var url2 = "http://112.175.184.204:3000/ballot/0x7f0b7d1e4e88c9b7f43e66078987f6561dbd3c7f/";
    var url3 = "http://112.175.184.205:3000/ballot/0x7f0b7d1e4e88c9b7f43e66078987f6561dbd3c7f/";
    var qrcodeList=[{}];
    for(var i=0;i<110;i++) {
       console.log("num"+i);

      qrcodeList[i] = {qrurl :  MyTestInsS.getVoter (i)[0] ,
                     canno :  MyTestInsS.getVoter (i)[1], 
                     num : i+1,
                     cnt : i  }; 
     } 
     return qrcodeList;
   }  
});
