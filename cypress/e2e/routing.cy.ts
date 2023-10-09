const ROUTES = [
  {
    path: "/",
    selector: "h1",
    content: "МБОУ АЛГОСОШ",
  },
  {
    path: "/recursion",
    selector: "h3",
    content: "Строка",
  },
  {
    path: "/fibonacci",
    selector: "h3",
    content: "Последовательность Фибоначчи",
  },
  {
    path: "/sorting",
    selector: "h3",
    content: "Сортировка массива",
  },
  {
    path: "/stack",
    selector: "h3",
    content: "Стек",
  },
  {
    path: "/queue",
    selector: "h3",
    content: "Очередь",
  },
  {
    path: "/list",
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

      cy.url().should("eq", Cypress.config("baseUrl") + route.path);

      cy.get(route.selector).should("contain", route.content);
    });
  });
});
