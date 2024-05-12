// import request from 'supertest';
const request= require('supertest');
const {app} = require('./src/index')
// import app from './src/index'; // Assuming your Express app is exported from this file

describe('User List API Integration Tests', () => {

  // Before running tests, authenticate user and obtain JWT toke

  // Test adding an item to the user's list
  it('should add an item to the user\'s list', async () => {
    const userId = '123';
    const itemId = '456';

    const response = await request(app)
      .post(`/mylist/add-to-list/${userId}/${itemId}`)

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // Test removing an item from the user's list
  it('should remove an item from the user\'s list', async () => {
    const userId = '123';
    const itemId = '456';

    const response = await request(app)
      .delete(`/mylist/remove-from-list/${userId}/${itemId}`)

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // Test listing items in the user's list
  it('should list items in the user\'s list', async () => {
    const userId = '123';

    const response = await request(app)
      .get(`/mylist/list-items/${userId}`)

    expect(response.status).toBe(200);
    // Add more assertions to validate the response format, pagination, etc.
  });
});
