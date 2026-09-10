// TC-14: Log in via the interface with valid credentials

describe("Login", () => {
  it("TC-14: Logs in successfully with valid credentials", () => {
    cy.visit("/");

    cy.get('input[type="email"]').type("firstuser@email.com");
    cy.get('input[type="password"]').type("password123");
    cy.get("button").contains("Log in").click();

    cy.contains("Contacts").should("be.visible");
  });
});