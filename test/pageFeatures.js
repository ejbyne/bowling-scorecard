describe('webpage', function(){

  before(function(){
    casper.start('http://localhost:3000/');
  });

  it('shows a welcome message', function() {
    casper.then(function(){
      expect('#welcome_message').to.be.inDOM.and.to.be.visible;
      expect('#enter_name_form').to.be.inDOM.and.to.be.visible;
    });
  });

  it('allows the user to enter his or her name and start the scorecard', function() {
  	casper.then(function() {
  		this.fillSelectors('#enter_name_form', {
  			'input': 'Ed'
  		}, true);
  	})
  	.then(function() {
  		expect('body').to.contain.text('Ed\'s Bowling Scorecard');
  		expect('body').to.contain.text('Frame 1 Roll 1');
  		expect('body').to.contain.text('Please enter pins hit:');
  		expect('#selection').to.be.inDOM.and.to.be.visible;
  	});
  });

  it('enables the user to enter his or her roll score and see that score and the running total', function() {
  	casper.then(function() {
  		this.clickLabel('1');
  		this.clickLabel('1');
  	})
  	.then(function() {
  		expect('#table').to.be.inDOM.and.to.be.visible;
  		expect('#table').to.contain.text('1');
  		expect('#table').to.contain.text('2');
  	});
  });

  it('notifies the user if he or she has scored a spare', function() {
  	casper.then(function() {
  		this.clickLabel('8');
  		this.clickLabel('2');
  	})
  	.then(function() {
  		expect('body').to.contain.text('Spare!');
  		expect('#table').to.contain.text('8');
  		expect('#table').to.contain.text('2');
  		expect('#table').to.contain.text('12');
  	});
  });

  it('notifies the user if he or she has scored a strike', function() {
  	casper.then(function() {
  		this.clickLabel('10');
  	})
  	.then(function() {
  		expect('body').to.contain.text('Strike!');
  		expect('#table').to.contain.text('32');
  	});
  });

  it('notifies the user when he or she has finished the game and shows the final score', function() {
  	casper.then(function() {
  		for (var i = 1; i <= 16; i++) {
  			this.clickLabel('1');
  		}
  	})
  	.then(function() {
  		expect('body').to.contain.text('Game Over');
  		expect('body').to.contain.text('Nice Try!');
  		expect('#table').to.contain.text('48');
  	})
  });

});
