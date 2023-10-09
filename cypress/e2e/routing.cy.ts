const ROUTES = [
  {
    path: "/",
    expectedUrl: "/",
    selector: "h1",
    content: "МБОУ АЛГОСОШ",
  },
  {
    path: "/recursion",
    expectedUrl: "/recursion",
    selector: "h3",
    content: "Строка",
  },
  {
    path: "/fibonacci",
    expectedUrl: "/fibonacci",
    selector: "h3",
    content: "Последовательность Фибоначчи",
  },
  {
    path: "/sorting",
    expectedUrl: "/sorting",
    selector: "h3",
    content: "Сортировка массива",
  },
  {
    path: "/stack",
    expectedUrl: "/stack",
    selector: "h3",
    content: "Стек",
  },
  {
    path: "/queue",
    expectedUrl: "/queue",
    selector: "h3",
    content: "Очередь",
  },
  {
    path: "/list",
    expectedUrl: "/list",
    selector: "h3",
    content: "Связный список",
  },
];

describe("Навигация приложения", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  ROUTES.forEach((route) => {
    it(`должна открыться страница ${route.content}`, () => {
      cy.visit(route.path);

      cy.url().should("eq", Cypress.config("baseUrl") + route.expectedUrl);

      cy.get(route.selector).should("contain", route.content);
    });
  });
});
