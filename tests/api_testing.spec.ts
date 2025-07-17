import { test, expect } from '@playwright/test';
import pageTwoAllUsers from '../test-data/reqres_users_page2_response.json'


test.describe('API Testing', () => {

    // 1. GET All Users — Compare to Saved Response
    test('GET all users - match saved response', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');
        // verify status from headers
        expect(response.status()).toBe(200); 
        // parse response body
        const body = await response.json();
        // compare full structure with saved response
        expect(body).toEqual(pageTwoAllUsers); 
    });

    // 2 . GET One User — Field-by-Field Assertions
    test ('GET single user - check fields', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/2');
        const body = await response.json();

        // console.log(body);
        expect(response.status()).toBe(200);
        expect(body.data.id).toBe(2);
        expect(body.data.email).toBe('janet.weaver@reqres.in');
        expect(body.data.first_name).toBe('Janet');
        expect(body.data.last_name).toBe('Weaver');
        expect(body.support.text).toBe('Tired of writing endless social media content? Let Content Caddy generate it for you.');
    });

    // 3. POST — Create a New User
    test('POST create user', async ({ request }) => {
        const newUser = { name: 'john', job: 'qa engineer' };

        const response = await request.post('https://reqres.in/api/users', {
            data: newUser,
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(201);
        expect(body.name).toBe(newUser.name);
        expect(body.job).toBe(newUser.job);
    })

    // 4. PUT — Update Existing User
    test('PUT update user', async ({ request }) => {
        // const updatedUser = { name: 'Neo', job: 'the One' };

        const response = await request.put('https://reqres.in/api/users/2', {
            data: { 
                name: 'Neo', 
                job: 'the One' 
            },
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const body = await response.json();

        console.log(body);

        expect(response.status()).toBe(200);
        expect(body.name).toBe('Neo');
        expect(body.job).toBe('the One');
    })

    // 5. DELETE — Remove a User
    test('DELETE user', async ({ request }) => {
        const response = await request.delete('https://reqres.in/api/users/2',
            {
                headers: {
                    'x-api-key': 'reqres-free-v1'
                }
            }
        ) 

        console.log(response.status());
        // Verify that the response status is 204 (No Content)
        expect(response.status()).toBe(204);
    })
});