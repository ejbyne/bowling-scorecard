describe("Message", function() {

  var container

  beforeEach(function() {
    container = $("<div></div>")
  })

  it('displays html messages', function() {
    var message = new Message(container)
    message.addText('Test Message')
    expect(container.html()).toMatch(/Test Message/)
  })

})

