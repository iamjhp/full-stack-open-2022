
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cypress',
      password: 'password'
    }
    cy.request('POST',  'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login button of the front page is displayed', function() {
    cy.contains('log in')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {username: 'cypress', password: 'password'})
      .then(response => {
        localStorage.setItem('loggedInBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('new page after login can be opened', function() {
      cy.contains('blogs')
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#blogName-input').type('hello')
      cy.get('#author-input').type('world')
      cy.get('#url-input').type('e2e-test.com')
      cy.contains('create').click()

      cy.contains('hello')
      cy.contains('world')
      cy.contains('nono').should('not.exist')
    })

    it('A user who created the blog can delete it', function() {
      cy.createBlog({ title: 'first', author: 'first author', url: 'first.com' })

      cy.contains('view').click()
      cy.contains('first.com')

      cy.contains('delete').click()
      cy.contains('first.com').should('not.exist')
    })

    describe('and some blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first', author: 'The title with the fewest likes', url: 'first.com', likes: 2})
        cy.createBlog({ title: 'second', author: 'The title with the most likes', url: 'second.com', likes: 7})
        cy.createBlog({ title: 'third', author: 'The title with the second most likes', url: 'third.com', likes: 4})
      })

      it('one of those can be opened by clicking view button', function() {
        cy.contains('second author')
          .contains('view')
          .click()
      })

      it('one of those can be liked', function() {
        cy.contains('third author')
          .contains('view')
          .click()

        cy.contains('third author')
          .contains('like')
          .click()
      })

      it('Blogs are ordered based on likes in descending order', function() {
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the fewest likes')
      })
    })
  })

  it('login fails with wrong credentials', function() {
    cy.contains('log in').click()
    cy.get('#username').type('cypress')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'user or password invalid')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
  })
})
