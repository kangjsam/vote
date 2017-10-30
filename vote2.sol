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
    
    uint nStatus = 0; //�����ʱ�ȭ�� 1ȸ�� ����
    
    // ���� �ʱ�ȭ
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



    // ���� ���� ���
    function setVoteFlag (uint nVoteFlag) payable {
        stV.nVoteFlag = nVoteFlag;
    }
    // ���� ���� ��ȸ
    function getVoteFlag () constant returns (uint) {
        return stV.nVoteFlag;
    }
    
    // ���� ��Ī��ȸ
    function getVoteNm () constant returns (string) {
        return stV.sVoteNm;
    }
    // ������ ���- Ballot�ʱ�ȭ�ÿ� 1+    
    function setVoterCnt () payable {
        stV.nVoterCnt = stV.nVoterCnt+1;
    }
    //������ ��� ��ȸ
    function getVoterCnt () constant  returns (uint) {
        return stV.nVoterCnt;
    }

    // ������ ���   
    function setVoterReg (uint seq, address BallotAddr) payable {
        stL[seq].BallotAddr = BallotAddr;
        stL[seq].nCanNo = 0;
    }

    function setVoterRlt (uint seq, uint CanNo) payable {
        stL[seq].nCanNo = CanNo;
    }
    
    // ������ ��ȸ 
    function getVoter (uint seq) constant returns (address BallotAddr , uint CanNo) {
        BallotAddr =stL[seq].BallotAddr ;
        CanNo = stL[seq].nCanNo ;
    }
    
    // ��ü ��ǥ�Ǽ� ��ȸ
    function getVoteTotCnt () constant  returns (uint) {
        return stV.nVoteTotCnt;
    }
    // ��ü ��ǥ�Ǽ� set
    function setVoteTotCnt ( uint w) payable{

        if (stV.nVoteFlag==1) {
            stV.nVoteTotCnt = stV.nVoteTotCnt+w;
        }
    }
    // �ĺ�  ��ȸ
    function getCanNm  (uint8 Num )  constant returns(string Name) {
        return stC[Num].sCanNm;
    }
    // �ĺ�  ��ȸ
    function getCanVoteCnt  (uint8 Num )  constant returns(uint8) {
        return stC[Num].nCanCnt;
    }
    // �ĺ��� �Ǽ� ��ȸ
    function getCanCnt  ()  constant returns(uint) {
        return stV.nCanCnt;
    }
    // �ĺ� ��� 
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
    // �ĺ��� ��ǥ �Ǽ� 
    function setCanVoteCnt(uint8 i)  payable {
         stC[i].nCanCnt = stC[i].nCanCnt +1;
    }

}

contract Ballot {
    
    // ��ǥ�� ���� - ����Accout,��ǥ����ġ(1)
    struct stBallot {
        address  VoteAddr;
        uint     nSerialNo;
        uint     nWeight;
    } 
    
    stBallot stB;

    
    //��ǥ���� ����Accout�� ��ǥ������ set ��
    function setInitBallot(address VoteAddr,address BallotAddr, uint SerialNo) payable {
         Vote v = Vote(VoteAddr);
         if (v.getVoteFlag() == 0 && stB.nWeight != 1) {
             stB.VoteAddr = VoteAddr;
             stB.nWeight = 1;
             stB.nSerialNo = SerialNo;
             //������ ī��Ʈ
             v.setVoterCnt();
             v.setVoterReg(SerialNo, BallotAddr);
         }
    }
    // ��ǥ ����ġ ��ȸ
    function getWeight () constant  returns (uint) {
        return stB.nWeight;
    }

        
    //��ǥó��
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
