describe("forecast", () => {
  it("user can get forecast", () => {
    cy.visit("localhost:3000");
    // enter location
    cy.wait(1000);
    cy.findByRole("textbox", { name: /location/i }).type("Chicago");
    //click enter
    cy.findByRole("textbox", { name: /location/i }).type("{enter}");
  });
});
