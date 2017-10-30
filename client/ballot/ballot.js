//Template.ballot.onRendered(function () {
//   Web3 = require('web3');
//   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer)); 
 
//  console.log("right side rendered");
//  var template = Template.instance();
//  console.log(template);
//});

Template.ballot.onCreated(function ballotOnCreated() {
   Web3 = require('web3');
   web3 = new Web3(new Web3.providers.HttpProvider(rpcServer)); 
             console.log("aaaaaaaaaaaaaaa"+rpcServer);
   var template = Template.instance();
   this.canCnt = new ReactiveVar(0);  
   this.ballotAddr = new ReactiveVar(template.data.baladdr);
   this.voteAddr = new ReactiveVar(template.data.voteaddr);
   console.log("baladdr: " + template.data.baladdr);  
   console.log("vote: " + template.data.voteaddr);    
   this.voteresult = new ReactiveVar("");    
   this.txhash = new ReactiveVar("");         
});


Template.ballot.helpers({
  tlist() {

    MyTestS   = web3.eth.contract(vote.abi);    // unlock
    web3.personal.unlockAccount(web3.eth.accounts[0],'3');
 
    // initiate contract for an address
    var MyTestInsS = MyTestS.at(Template.instance().voteAddr.get());

    var Cnt = MyTestInsS.getCanCnt();
    
    Template.instance().canCnt.set(Cnt);

    console.log();
    //  setvoteend function
    var testlist=[{}];
    for(var i=0;i<Cnt;i++) {
                console.log("num"+i);
      testlist[i] = {name : MyTestInsS.getCanNm (i) ,
                     num : i+1,
                     cnt : i  };     
     } 
     console.log(testlist);
     return testlist;
},
 ballotAddr() {
         console.log("baddr:"+Template.instance().ballotAddr.get() ); 
     return Template.instance().ballotAddr.get();
 },
  voteAddr() {
         console.log("vaddr:"+Template.instance().voteAddr.get() ); 
     return Template.instance().voteAddr.get();
 },
 voteresult() {
         console.log("voteresult:"+Template.instance().voteresult.get() ); 
     return Template.instance().voteresult.get();
 },
  txhash() {
         console.log("voteresult:"+Template.instance().txhash.get() ); 
     return Template.instance().txhash.get();
 }
});


Template.ballot.events({
  'click .toggle-checked' (event, instance) {
    var Cnt = instance.canCnt.get().c[0];
    console.log(Cnt); 
    var CanNo ;   
    for (var i=0;i<Cnt;i++) {
        if(!document.getElementsByClassName("toggle-checked")[i].checked){
            document.getElementsByClassName("toggle-checked")[i].disabled=true;
            console.log ("aaaa");
        } else {
           console.log(document.getElementsByClassName("toggle-checked")[i].value); 
        }
    }
   },
   'click .send' (event, instance) {
    var Cnt = instance.canCnt.get().c[0];
    console.log(Cnt); 

    MyVote   = web3.eth.contract(ballot.abi); 

    console.log("addr:"+instance.ballotAddr.get() ); 
    var MyVoteIns = MyVote.at(instance.ballotAddr.get() );
    
    var chk = 0;
    for (var i=0;i<Cnt;i++) {
        if(!document.getElementsByClassName("toggle-checked")[i].checked){
            document.getElementsByClassName("toggle-checked")[i].disabled=true;
            console.log ("aaaa");
        } else {
            var CanNo = document.getElementsByClassName("toggle-checked")[i].value;
            chk = 1;
            console.log(document.getElementsByClassName("toggle-checked")[i].value);

        }
    }
    
    var weight = MyVoteIns.getWeight();
    if (weight == 1)
    {
        if (chk== 1) {
            console.log("v:"+instance.voteAddr.get())
           var rlt =  MyVoteIns.CastBallot(instance.voteAddr.get() ,
                                 CanNo ,
                                {from:web3.eth.accounts[0] ,gas:1000000}, 
                                 function(e,r) {
                                 console.log("reg"+r);
                                 instance.txhash.set("거래번호"+r);
                                });
           console.log("rlt:"+rlt);

           instance.voteresult.set("정상적으로 투표하였습니다.");
        }
        else {
           instance.voteresult.set("후보를 선택하시기 바랍니다."); 
        }
    }
    else  {
        instance.voteresult.set("이미 투표하였습니다.");
    }
    },
});