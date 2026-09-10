//TC-01 Create contact with valid data
//TC-07 Acess the contacts route with a valid token

describe("Contacts API", () => {
    it("TC-01 & TC-07: Create a new contact with valid data and access the contacts route with a valid token", () => {
        //Step 1: Log in via API to get a valid token
        cy.request("POST", "/auth/login", {
            email: "firstuser@email.com",
            password: "password123",
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
            const token = loginResponse.body.token;

            //Step 2: Use that token to create a new a contact
            cy.request({
                method: "POST",
                url:"/contacts",
                headers:{ Authorization: `Bearer ${token}` },
                body:{
                    name: "Cypress Test User",
                    email:"cypresstest@email.com",
                    phone: "70000000077",
                    category: "work",

                },
            }).then((createResponse) => {
                expect(createResponse.status).to.eq(201);
                expect(createResponse.body).to.have.property("_id");
                expect(createResponse.body.name).to.eq("Cypress Test User");
            });
        });
    });
});