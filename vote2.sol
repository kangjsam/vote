pragma solidity ^0.4.0;

contract Vote {

    struct stVote {
        string sVoteNm;
        uint   nVoteTotCnt;
        uint   nVoterCnt;
        uint   nVoteFlag;
        uint   nCanCnt;
    }

    struct stCan {
        string sCanNm ;
        uint8  nCanCnt;
        uint8  nCanFlag;
    }  

    struct stList {
        address BallotAddr ;
        uint    nCanNo;
    }  
    
    stVote stV;    
    
    mapping(uint8 => stCan)  stC; 

    mapping(uint => stList)  stL;
    
    uint nStatus = 0; //선거초기화는 1회만 가능
    
    // 선거 초기화
    function setInitVote (string Name) payable {
         if (nStatus == 0) {
             stV.nVoteTotCnt =0;
             stV.sVoteNm = Name;
             stV.nVoteFlag = 0;
             stV.nVoterCnt= 0;
             stV.nCanCnt = 0;
         }
         nStatus = 1;
    }



    // 선거 상태 등록
    function setVoteFlag (uint nVoteFlag) payable {
        stV.nVoteFlag = nVoteFlag;
    }
    // 선거 상태 조회
    function getVoteFlag () constant returns (uint) {
        return stV.nVoteFlag;
    }
    
    // 선거 명칭조회
    function getVoteNm () constant returns (string) {
        return stV.sVoteNm;
    }
    // 유권자 등록- Ballot초기화시에 1+    
    function setVoterCnt () payable {
        stV.nVoterCnt = stV.nVoterCnt+1;
    }
    //유권자 등록 조회
    function getVoterCnt () constant  returns (uint) {
        return stV.nVoterCnt;
    }

    // 유권자 등록   
    function setVoterReg (uint seq, address BallotAddr) payable {
        stL[seq].BallotAddr = BallotAddr;
        stL[seq].nCanNo = 0;
    }

    function setVoterRlt (uint seq, uint CanNo) payable {
        stL[seq].nCanNo = CanNo;
    }
    
    // 유권자 조회 
    function getVoter (uint seq) constant returns (address BallotAddr , uint CanNo) {
        BallotAddr =stL[seq].BallotAddr ;
        CanNo = stL[seq].nCanNo ;
    }
    
    // 전체 투표건수 조회
    function getVoteTotCnt () constant  returns (uint) {
        return stV.nVoteTotCnt;
    }
    // 전체 투표건수 set
    function setVoteTotCnt ( uint w) payable{

        if (stV.nVoteFlag==1) {
            stV.nVoteTotCnt = stV.nVoteTotCnt+w;
        }
    }
    // 후보  조회
    function getCanNm  (uint8 Num )  constant returns(string Name) {
        return stC[Num].sCanNm;
    }
    // 후보  조회
    function getCanVoteCnt  (uint8 Num )  constant returns(uint8) {
        return stC[Num].nCanCnt;
    }
    // 후보자 건수 조회
    function getCanCnt  ()  constant returns(uint) {
        return stV.nCanCnt;
    }
    // 후보 등록 
    function setCanReg(uint8 i,string cName)  payable {
        if (stC[i].nCanFlag != 1) 
        {
            if (i == 0) 
                stV.nCanCnt = 1;
            else
            {
                if (stC[i-1].nCanFlag == 1 && stC[i].nCanFlag != 1 )
                   stV.nCanCnt = i+1; 
            }
            stC[i].sCanNm   = cName ;
            stC[i].nCanCnt  = 0;
            stC[i].nCanFlag = 1;
        }
        else
        {
            stC[i].sCanNm   = cName ;
        }    
    }
    // 후보자 투표 건수 
    function setCanVoteCnt(uint8 i)  payable {
         stC[i].nCanCnt = stC[i].nCanCnt +1;
    }

}

contract Ballot {
    
    // 투표지 관리 - 선거Accout,투표가중치(1)
    struct stBallot {
        address  VoteAddr;
        uint     nSerialNo;
        uint     nWeight;
    } 
    
    stBallot stB;

    
    //투표지는 선거Accout와 투표권한을 set 함
    function setInitBallot(address VoteAddr,address BallotAddr, uint SerialNo) payable {
         Vote v = Vote(VoteAddr);
         if (v.getVoteFlag() == 0 && stB.nWeight != 1) {
             stB.VoteAddr = VoteAddr;
             stB.nWeight = 1;
             stB.nSerialNo = SerialNo;
             //유권자 카운트
             v.setVoterCnt();
             v.setVoterReg(SerialNo, BallotAddr);
         }
    }
    // 투표 가중치 조회
    function getWeight () constant  returns (uint) {
        return stB.nWeight;
    }

        
    //투표처리
    function CastBallot(address VoteAddr,uint8 i ) payable returns (string ){
        Vote v = Vote(VoteAddr);
        if (v.getVoteFlag() == 1 && stB.nWeight > 0) {
             v.setVoteTotCnt(stB.nWeight);
             v.setCanVoteCnt(i);
             v.setVoterRlt(stB.nSerialNo, i+1);
             stB.nWeight = 0;
             return "Y";
        } else  {  
             return  "N";   
        }
    }
}
