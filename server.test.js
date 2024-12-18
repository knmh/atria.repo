const { app, server } = require("./server");
const request = require("supertest");

test("valid payload", async function() {
    const testPayload = {
        name: 'test name',
        email: 'test.emailt@example.com',
        interests: 'testing'
    };
    const response = await request(app)
        .post('/putprofile')
        .send(testPayload)
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("info");
    expect(response.body.info).toBe("Profile updated successfully");
    server.close();


});

test("invalid payload", async function() {
    const testPayload = {};
    const response = await request(app)
        .post('/putprofile')
        .send(testPayload)
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid payload");
    server.close();


});