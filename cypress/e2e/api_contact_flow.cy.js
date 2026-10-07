// TC-17 Full API flow  login, create and delete a contact (no interface)

describe("API flow - login and contact lifecycle (cloud)", () => {
  const renderUrl = "https://contacts-api-nkeu.onrender.com";
  let token;
  let createdContactId;

  before(() => {
    cy.request({
      method: "POST",
      url: `${renderUrl}/auth/login`,
      body: {
        email: "firstuser@email.com",
        password: "password123",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      token = response.body.token;
    });
  });

  it("TC-17: creates a contact via API in the cloud environment", () => {
    cy.request({
      method: "POST",
      url: `${renderUrl}/contacts`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: "API Flow Contact",
        email: "apiflow@example.com",
        phone: "10000000088",
        category: "work",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq("API Flow Contact");
      createdContactId = response.body._id;
    });
  });

  after(() => {
    // Clean up: remove the contact created by this test
    if (createdContactId) {
      cy.request({
        method: "DELETE",
        url: `${renderUrl}/contacts/${createdContactId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  });
});