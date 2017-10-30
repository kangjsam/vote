BallotController = RouteController.extend ({
    data : function () {
        var baddr = this.params._baddr;
        ballot.address = this.params._baddr;
        var vaddr = this.params._vaddr;
        vote.address = this.params._baddr;
        console.log(vaddr);
        console.log(baddr);
        return {voteaddr : vaddr , baladdr : baddr} ;
    },
    template : 'ballot'
});