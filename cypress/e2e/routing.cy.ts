describe("Навигация приложения", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("должна открыться главная страница", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("h1").should("contain", "МБОУ АЛГОСОШ");
  });

  it("должна открыться страница строка", () => {
    cy.visit("/recursion");
    cy.url().should("eq", "http://localhost:3000/recursion");
    cy.get("h3").should("contain", "Строка");
  });

  it("должна открыться страница фибоначчи", () => {
    cy.visit("/fibonacci");
    cy.url().should("eq", "http://localhost:3000/fibonacci");
    cy.get("h3").should("contain", "Последовательность Фибоначчи");
  });

  it("должна открыться страница сортировка", () => {
    cy.visit("/sorting");
    cy.url().should("eq", "http://localhost:3000/sorting");
    cy.get("h3").should("contain", "Сортировка массива");
  });

  it("должна открыться страница стек", () => {
    cy.visit("/stack");
    cy.url().should("eq", "http://localhost:3000/stack");
    cy.get("h3").should("contain", "Стек");
  });

  it("должна открыться страница очередь", () => {
    cy.visit("/queue");
    cy.url().should("eq", "http://localhost:3000/queue");
    cy.get("h3").should("contain", "Очередь");
  });

  it("должна открыться страница Связный список", () => {
    cy.visit("/list");
    cy.url().should("eq", "http://localhost:3000/list");
    cy.get("h3").should("contain", "Связный список");
  });
});
