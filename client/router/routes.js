//Router.configure({
//  layoutTemplate: 'mainLayout'
//  });

Router.route('/', {
  layoutTemplate: 'mainLayout',
  name: 'home'
});

//Router.route('/vote1',function() {
//    this.render('vote1');
//});

Router.route('/vote1', {
  layoutTemplate: 'mainLayout',  
  name: 'vote1'
});

Router.route('/vote2', {
  layoutTemplate: 'mainLayout',  
  name: 'vote2'
});

Router.route('/vote3', {
  layoutTemplate: 'mainLayout',  
  name: 'vote3'
});

Router.route('/vote4', {
  layoutTemplate: 'mainLayout',  
  name: 'vote4'
});

Router.route('/vote5', {
  layoutTemplate: 'mainLayout',
  name: 'vote5'
});

Router.route('/vote6', {
  layoutTemplate: 'mainLayout',
  name: 'vote6'
});

Router.route('/vote7', {
  layoutTemplate: 'mainLayout',
  name: 'vote7'
});

Router.route('/ballot/:_vaddr/:_baddr', 
             {controller : 'BallotController'}
);
