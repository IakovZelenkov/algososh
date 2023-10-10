import { SELECTORS, STYLES } from "../constants/constants";

const STEPS_DATA = [
  [
    { text: "h", style: STYLES.defaultBorder },
    { text: "e", style: STYLES.defaultBorder },
    { text: "l", style: STYLES.defaultBorder },
    { text: "l", style: STYLES.defaultBorder },
    { text: "o", style: STYLES.defaultBorder },
  ],
  [
    { text: "h", style: STYLES.changingBorder },
    { text: "e", style: STYLES.defaultBorder },
    { text: "l", style: STYLES.defaultBorder },
    { text: "l", style: STYLES.defaultBorder },
    { text: "o", style: STYLES.changingBorder },
  ],
  [
    { text: "o", style: STYLES.modifiedBorder },
    { text: "e", style: STYLES.changingBorder },
    { text: "l", style: STYLES.defaultBorder },
    { text: "l", style: STYLES.changingBorder },
    { text: "h", style: STYLES.modifiedBorder },
  ],
  [
    { text: "o", style: STYLES.modifiedBorder },
    { text: "l", style: STYLES.modifiedBorder },
    { text: "l", style: STYLES.modifiedBorder },
    { text: "e", style: STYLES.modifiedBorder },
    { text: "h", style: STYLES.modifiedBorder },
  ],
];

describe("Компонент String", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("кнопка должна быть заблокирована, если инпут пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.button).should("be.disabled");
  });

  it("корректно работает блокирование и разблокирование кнопки", () => {
    cy.get(SELECTORS.input).type("hello");
    cy.get(SELECTORS.button).should("not.be.disabled");
    cy.get(SELECTORS.button).click();
    cy.get(SELECTORS.button).should("be.disabled");
    cy.get(SELECTORS.button).should("be.disabled");
  });

  it("корректно работает блокирование и разблокирование инпута", () => {
    cy.get(SELECTORS.input).type("hello");
    cy.get(SELECTORS.button).click();
    cy.get(SELECTORS.input).should("be.disabled");
    cy.get(SELECTORS.input).should("not.be.disabled");
  });

  it("корректно работает алгоритм разворота строки", () => {
    cy.get(SELECTORS.input).type("hello");
    cy.get(SELECTORS.button).click();
    cy.get(SELECTORS.circle).should("have.length", 5);

    STEPS_DATA.forEach((stepData, stepIndex) => {
      stepData.forEach((circleData, circleIndex) => {
        cy.get(SELECTORS.circle)
          .eq(circleIndex)
          .should("contain.text", circleData.text)
          .should("have.css", "border", circleData.style);
      });
    });
  });
});
