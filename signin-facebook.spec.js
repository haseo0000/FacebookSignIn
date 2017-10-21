function SimpleApp(service){
  this.service = service

  this.echo = (nickname) => {
    var firstname =  this.service(nickname)
      return `Hello ${firstname}!`
    //return 'Hello world!'
  }
}
//////////////////////////////////////////////////

function BuuAuthen(authService){
  this.authService = authService

  this.signIn = (username,password) => {
    var obj = this.authService(username,password)
    return {
          name: obj.name,
          token: '0000000000'
          }
  }
}

////////////////////////////////////////////////////////////////////////////////

test('Simple Mock', () => {
  const mockFn = jest.fn('Ball')
    .mockReturnValue('Weera')


  var app = new SimpleApp(mockFn)
  var nickname = 'Ball'
  var result = app.echo(nickname)

  expect(mockFn).toHaveBeenCalled()
  expect(mockFn).toHaveBeenCalledWith(nickname)
  expect(result).toBe('Hello Weera!')
})

///////////////////////////////////////////////////////////////////////////////

test('Sign-in with facebook', () => {
  const facebookAuthMock = jest.fn()
    .mockReturnValue({
          name: 'Nantapob',
          facebookId: '1234567890',
          email: 'Nantapob007@hotmail.com'
    })


  var auth = new BuuAuthen(facebookAuthMock)
  var username = 'Nantapob007@hotmail.com'
  var password = '785429185'
  var accountInfo = auth.signIn(username,password)


  expect(facebookAuthMock).toHaveBeenCalled()
  expect(facebookAuthMock).toHaveBeenCalledWith(username, password)
  expect(accountInfo.name).toBe('Nantapob')
  expect(accountInfo).toHaveProperty('token')
   expect(accountInfo.token).toHaveLength(10)
})
