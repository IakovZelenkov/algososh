const ROUTES = [
  {
    path: "/",
    expectedUrl: "http://localhost:3000/",
    selector: "h1",
    content: "МБОУ АЛГОСОШ",
  },
  {
    path: "/recursion",
    expectedUrl: "http://localhost:3000/recursion",
    selector: "h3",
    content: "Строка",
  },
  {
    path: "/fibonacci",
    expectedUrl: "http://localhost:3000/fibonacci",
    selector: "h3",
    content: "Последовательность Фибоначчи",
  },
  {
    path: "/sorting",
    expectedUrl: "http://localhost:3000/sorting",
    selector: "h3",
    content: "Сортировка массива",
  },
  {
    path: "/stack",
    expectedUrl: "http://localhost:3000/stack",
    selector: "h3",
    content: "Стек",
  },
  {
    path: "/queue",
    expectedUrl: "http://localhost:3000/queue",
    selector: "h3",
    content: "Очередь",
  },
  {
    path: "/list",
    expectedUrl: "http://localhost:3000/list",
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
      cy.url().should("eq", route.expectedUrl);
      cy.get(route.selector).should("contain", route.content);
    });
  });
});
