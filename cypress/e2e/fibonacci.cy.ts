import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { SELECTORS, STYLES } from "../constants/constants";

const STEPS_DATA = [
  [1],
  [1, 1],
  [1, 1, 2],
  [1, 1, 2, 3],
  [1, 1, 2, 3, 5],
  [1, 1, 2, 3, 5, 8],
];

describe("Компонент Fibonacci", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.url().should("eq", "http://localhost:3000/fibonacci");
  });

  it("кнопка должна быть выключена, если инпут пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.button).should("be.disabled");
  });

  it("корректно работает алгоритм фибоначчи", () => {
    cy.get(SELECTORS.input).type("5");
    cy.get(SELECTORS.button).should("not.be.disabled");
    cy.get(SELECTORS.button).click();
    cy.get(SELECTORS.button).should("be.disabled");
    cy.get(SELECTORS.input).should("be.disabled");

    STEPS_DATA.forEach((stepData, stepIndex) => {
      if (stepIndex !== 0) cy.wait(SHORT_DELAY_IN_MS);

      cy.get(SELECTORS.circle).should("have.length", stepData.length);

      stepData.forEach((expectedValue, circleIndex) => {
        cy.get(SELECTORS.circle)
          .eq(circleIndex)
          .should("contain.text", expectedValue)
          .should("have.css", "border", STYLES.defaultBorder);
        cy.get(SELECTORS.circleIndex)
          .eq(circleIndex)
          .should("contain.text", circleIndex);
      });
    });

    cy.get(SELECTORS.button).should("not.be.disabled");
    cy.get(SELECTORS.input).should("not.be.disabled");
  });
});
