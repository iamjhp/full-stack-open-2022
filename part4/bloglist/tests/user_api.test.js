const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


describe('when there is initially one user at DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })

  test('users are turend as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('additional of a new user', () => {
  test('a new user can be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'test user',
      password: 'pizza'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('existing username is not added', async () => {
    const userAtStart = await helper.usersInDb();
    
    const username = userAtStart[0].username
    const newUser = {
      username: username,
      name: 'hello world',
      password: 'looong'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username must be unique')
  })

  test('username with less 3 characters is not added', async () => {
    const usersAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'ab',
      name: 'hello world',
      password: 'looong'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await helper.blogsInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password with less 3 characters is not added', async () => {
    const usersAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'abc',
      name: 'hello world',
      password: 'aa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.blogsInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})