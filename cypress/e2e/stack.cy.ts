import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { SELECTORS, STYLES } from "../constants/constants";

const STEPS_DATA = ["1", "2", "3", "4", "5"];

const verifyCirclesAfterDelete = (expectedLength, targetIndex) => {
  cy.get(SELECTORS.circleContent)
    .should("have.length", expectedLength)
    .each((circleContent, circleIndex) => {
      if (circleIndex === targetIndex) {
        cy.wrap(circleContent).contains("top");
        cy.get(SELECTORS.circle)
          .eq(circleIndex)
          .should("contain", STEPS_DATA[circleIndex])
          .should("have.css", "border", STYLES.changingBorder);
      } else {
        cy.wrap(circleContent).should("not.contain", "top");
        cy.get(SELECTORS.circle)
          .eq(circleIndex)
          .should("contain", STEPS_DATA[circleIndex])
          .should("have.css", "border", STYLES.defaultBorder);
      }
    });
};

describe("Компонент Stack", () => {
  beforeEach(() => {
    cy.visit("/stack");
    cy.url().should("eq", "http://localhost:3000/stack");
  });

  it("кнопка 'добавить' должна быть заблокирована, если инпут пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.addButton).should("be.disabled");
  });

  it("кнопка 'добавить' должна быть разблокирована, если инпут не пустой", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).should("not.be.disabled");
  });

  it("кнопка 'удалить' должна быть заблокирована, если стек пустой", () => {
    cy.get(SELECTORS.circle)
      .should("not.exist")
      .then(() => {
        cy.get(SELECTORS.deleteButton).should("be.disabled");
      });
  });

  it("кнопка 'удалить' должна быть разблокирована, если стек  не пустой", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.circle)
      .should("exist")
      .then(() => {
        cy.get(SELECTORS.deleteButton).should("not.be.disabled");
      });
  });

  it("кнопка 'очистить' должна быть заблокирована, если стек пустой", () => {
    cy.get(SELECTORS.circle)
      .should("not.exist")
      .then(() => {
        cy.get(SELECTORS.clearButton).should("be.disabled");
      });
  });

  it("кнопка 'очистить' должна быть разблокирована, если стек не пустой", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.circle)
      .should("exist")
      .then(() => {
        cy.get(SELECTORS.clearButton).should("not.be.disabled");
      });
  });

  it("инпут очищается после добавления элемента в стек", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.input).should("contain", "");
  });

  it("корректно работает добавление элементов в стек", () => {
    STEPS_DATA.forEach((stepData, stepIndex) => {
      if (stepIndex !== 0) cy.wait(SHORT_DELAY_IN_MS);
      cy.get(SELECTORS.input).clear();
      cy.get(SELECTORS.input).type(stepData);
      cy.get(SELECTORS.addButton).click();
      cy.get(SELECTORS.circle).should("have.length", stepIndex + 1);
      cy.get(SELECTORS.circleContent).each((circleContent, circleIndex) => {
        if (circleIndex === stepIndex) {
          cy.wrap(circleContent).contains("top");
          cy.get(SELECTORS.circle)
            .eq(circleIndex)
            .should("contain", STEPS_DATA[circleIndex])
            .should("have.css", "border", STYLES.changingBorder);
        }
        if (circleIndex !== stepIndex) {
          cy.wrap(circleContent).should("not.contain", "top");
          cy.get(SELECTORS.circle)
            .eq(circleIndex)
            .should("contain", STEPS_DATA[circleIndex])
            .should("have.css", "border", STYLES.defaultBorder);
        }
      });
    });
  });

  it("корректно работает удаление элементов из стека", () => {
    STEPS_DATA.forEach((stepData, stepIndex) => {
      if (stepIndex !== 0) cy.wait(SHORT_DELAY_IN_MS);
      cy.get(SELECTORS.input).clear();
      cy.get(SELECTORS.input).type(stepData);
      cy.get(SELECTORS.addButton).click();
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(5, 4);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(4, 3);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(3, 2);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(2, 1);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(1, 0);

    cy.get(SELECTORS.circle).should("not.exist");
  });
});
