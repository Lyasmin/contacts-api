// TC-06 Access contacts route without a token
// TC-09 Create contact with invalid email format
// TC-10 Create contact without a required field

describe("Contacts API - negative scenarios", () => {
  let token;

  before(() => {
    // Log in once before all tests in this file, and reuse the token
    cy.request("POST", "/auth/login", {
      email: "firstuser@email.com",
      password: "password123",
    }).then((response) => {
      token = response.body.token;
    });
  });

  it("TC-06 Rejects access without a token", () => {
    cy.request({
      method: "GET",
      url: "/contacts",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Access token is required");
    });
  });

  it("TC-09 Rejects contact creation with an invalid email format", () => {
    cy.request({
      method: "POST",
      url: "/contacts",
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
      body: {
        name: "Cypress Invalid Email",
        email: "invalidemail",
        phone: "10000000066",
        category: "personal",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.include("Invalid email format");
    });
  });

  it("TC-10 rejects contact creation without the required name field", () => {
    cy.request({
      method: "POST",
      url: "/contacts",
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
      body: {
        email: "cypressmissingname@example.com",
        phone: "10000000055",
        category: "personal",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.include("Name is required");
    });
  });
});