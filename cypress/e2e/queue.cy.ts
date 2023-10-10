import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { SELECTORS, STYLES } from "../constants/constants";

const STEPS_DATA = ["1", "2", "3", "4", "5"];

const verifyCirclesAfterDelete = (
  removedIndex: number,
  targetIndex: number
) => {
  cy.get(SELECTORS.circleContent).eq(targetIndex).should("contain", "head");
  cy.get(SELECTORS.circle)
    .eq(targetIndex)
    .should("have.css", "border", STYLES.changingBorder);
  cy.get(SELECTORS.circleLetter)
    .eq(removedIndex)
    .invoke("text")
    .then((text) => text.trim())
    .should("be.empty");
};

describe("Компонент Queue", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("кнопка 'добавить' должна быть заблокирована, если инпут пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.addButton).should("be.disabled");
  });

  it("кнопка 'добавить' должна быть разблокирована, если инпут не пустой", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).should("not.be.disabled");
  });

  it("кнопка 'удалить' должна быть заблокирована, если очередь пустая", () => {
    cy.get(SELECTORS.circleLetter)
      .invoke("text")
      .then((text) => text.trim())
      .should("be.empty")
      .then(() => {
        cy.get(SELECTORS.deleteButton).should("be.disabled");
      });
  });

  it("кнопка 'удалить' должна быть разблокирована, если очередь не пустая", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.circleLetter)
      .invoke("text")
      .then((text) => text.trim())
      .should("not.be.empty")
      .then(() => {
        cy.get(SELECTORS.deleteButton).should("not.be.disabled");
      });
  });

  it("кнопка 'очистить' должна быть заблокирована, если очередь пустая", () => {
    cy.get(SELECTORS.circleLetter)
      .invoke("text")
      .then((text) => text.trim())
      .should("be.empty")
      .then(() => {
        cy.get(SELECTORS.clearButton).should("be.disabled");
      });
  });

  it("кнопка 'очистить' должна быть разблокирована, если очередь не пустая", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.circleLetter)
      .invoke("text")
      .then((text) => text.trim())
      .should("not.be.empty")
      .then(() => {
        cy.get(SELECTORS.clearButton).should("not.be.disabled");
      });
  });

  it("инпут очищается после добавления элемента в очередь", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.input).should("contain", "");
  });

  it("корректно работает очистка очереди", () => {
    cy.get(SELECTORS.input).type("1");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.input).type("2");
    cy.get(SELECTORS.addButton).click();
    cy.get(SELECTORS.clearButton).click();

    cy.get(SELECTORS.circleLetter)
      .invoke("text")
      .then((text) => text.trim())
      .should("be.empty");
    cy.get(SELECTORS.circleContent)
      .should("not.contain", "head")
      .should("not.contain", "tail");
  });

  it("корректно работает добавление элементов в очередь", () => {
    STEPS_DATA.forEach((stepData, stepIndex) => {
      cy.get(SELECTORS.input).clear();
      cy.get(SELECTORS.input).type(stepData);
      cy.get(SELECTORS.addButton).click();
      cy.get(SELECTORS.circleLetter)
        .invoke("text")
        .then((text) => text.trim())
        .should("not.be.empty")
        .should("have.length", stepIndex + 1);
      cy.get(SELECTORS.circleContent).each((circleContent, circleIndex) => {
        if (circleIndex === 0) {
          cy.wrap(circleContent).contains("head");
        } else {
          cy.wrap(circleContent).should("not.contain", "head");
        }
        if (circleIndex === stepIndex) {
          cy.wrap(circleContent).contains("tail");
        } else {
          cy.wrap(circleContent).should("not.contain", "tail");
        }
        cy.get(SELECTORS.circle)
          .eq(stepIndex)
          .should("have.css", "border", STYLES.changingBorder);
      });
      cy.get(SELECTORS.circleLetter).each((circleLetter, letterIndex) => {
        cy.wrap(circleLetter)
          .invoke("text")
          .then((text) => {
            if (text.trim() !== "") {
              cy.wrap(circleLetter).contains(STEPS_DATA[letterIndex]);
            }
          });
      });
    });
  });

  it("корректно работает удаление элементов из очереди", () => {
    STEPS_DATA.forEach((stepData) => {
      cy.get(SELECTORS.input).clear();
      cy.get(SELECTORS.input).type(stepData);
      cy.get(SELECTORS.addButton).click();
    });

    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(0, 1);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(1, 2);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(2, 3);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(3, 4);
    // Last step head and tails remains on the same index as deleted number
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.deleteButton).click();
    verifyCirclesAfterDelete(4, 4);
  });
});
