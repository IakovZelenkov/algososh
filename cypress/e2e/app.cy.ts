describe("Инициализация приложения", () => {
  it("страница доступна", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain", "МБОУ АЛГОСОШ");
  });
});
