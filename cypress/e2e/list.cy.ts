import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { SELECTORS, STYLES } from "../constants/constants";

const INITIAL_DATA = ["0", "34", "8", "1"];

describe("Компонент List", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("кнопки 'добавить в head' и 'добавить в tail' должны быть заблокированы, если инпут пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.addHeadButton).should("be.disabled");
    cy.get(SELECTORS.addTailButton).should("be.disabled");
  });

  it("кнопки 'добавить в head' и 'добавить в tail' должны быть разблокированы, если инпут не пустой", () => {
    cy.get(SELECTORS.input).type("test");
    cy.get(SELECTORS.addHeadButton).should("not.be.disabled");
    cy.get(SELECTORS.addTailButton).should("not.be.disabled");
  });

  it("кнопки 'удалить из head' и 'удалить из tail' должны быть заблокированы, если список пустой", () => {
    cy.get(SELECTORS.deleteHeadButton).click();
    cy.get(SELECTORS.deleteHeadButton).click();
    cy.get(SELECTORS.deleteHeadButton).click();
    cy.get(SELECTORS.deleteHeadButton).click();
    cy.get(SELECTORS.circle)
      .should("not.exist")
      .then(() => {
        cy.get(SELECTORS.deleteHeadButton).should("be.disabled");
        cy.get(SELECTORS.deleteTailButton).should("be.disabled");
      });
  });

  it("кнопки 'удалить из head' и 'удалить из tail' должны быть раззаблокированы, если список не пустой", () => {
    cy.get(SELECTORS.circle)
      .should("exist")
      .then(() => {
        cy.get(SELECTORS.deleteHeadButton).should("not.be.disabled");
        cy.get(SELECTORS.deleteTailButton).should("not.be.disabled");
      });
  });

  it("кнопка 'добавить по индексу' должна быть заблокирована, если инпут значения или инпут индекса пустой", () => {
    cy.get(SELECTORS.input).should("have.value", "");
    cy.get(SELECTORS.indexInput).should("have.value", "");
    cy.get(SELECTORS.addByIndexButton).should("be.disabled");
  });

  it("кнопка 'добавить по индексу' должна быть заблокирована, если введенного индекса нету в списке", () => {
    cy.get(SELECTORS.input).type("5");
    cy.get(SELECTORS.indexInput).type("5");
    cy.get(SELECTORS.addByIndexButton).should("be.disabled");
  });

  it("кнопка 'добавить по индексу' должна быть разаблокирована, если введенны корректные значения", () => {
    cy.get(SELECTORS.input).type("5");
    cy.get(SELECTORS.indexInput).type("1");
    cy.get(SELECTORS.addByIndexButton).should("not.be.disabled");
  });

  it("кнопка 'удалить по индексу' должна быть заблокирована, если инпут индекса пустой", () => {
    cy.get(SELECTORS.indexInput).should("have.value", "");
    cy.get(SELECTORS.deleteByIndexButton).should("be.disabled");
  });

  it("кнопка 'удалить по индексу' должна быть заблокирована, если введенного индекса нету в списке", () => {
    cy.get(SELECTORS.indexInput).type("5");
    cy.get(SELECTORS.deleteByIndexButton).should("be.disabled");
  });

  it("кнопка 'удалить по индексу' должна быть разаблокирована, если введенны корректные значения", () => {
    cy.get(SELECTORS.indexInput).type("1");
    cy.get(SELECTORS.deleteByIndexButton).should("not.be.disabled");
  });

  it("дефолтный список отрисовывается корректно", () => {
    cy.get(SELECTORS.circle).each((circle, circleIndex) => {
      cy.wrap(circle).should("contain", INITIAL_DATA[circleIndex]);
    });
    cy.get(SELECTORS.circleContent).each(
      (circleContent, circleContentIndex) => {
        if (circleContentIndex === 0) {
          cy.wrap(circleContent).contains("head");
        } else {
          cy.wrap(circleContent).should("not.contain", "head");
        }

        if (circleContentIndex === 3) {
          cy.wrap(circleContent).contains("tail");
        } else {
          cy.wrap(circleContent).should("not.contain", "tail");
        }
      }
    );
  });

  it("корректно работает добавление элемента в head", () => {
    cy.get(SELECTORS.input).type("123");
    cy.get(SELECTORS.addHeadButton).click();
    cy.get(SELECTORS.circleContent)
      .eq(0)
      .find(SELECTORS.smallCircle)
      .should("contain", "123")
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circle)
      .should("have.length", INITIAL_DATA.length + 1)
      .eq(0)
      .should("contain", "123")
      .should("have.css", "border", STYLES.modifiedBorder)
      .wait(SHORT_DELAY_IN_MS)
      .should("have.css", "border", STYLES.defaultBorder);
    cy.get(SELECTORS.circleContent).eq(0).contains("head");
  });

  it("корректно работает добавление элемента в tail", () => {
    cy.get(SELECTORS.input).type("123");
    cy.get(SELECTORS.addTailButton).click();
    cy.get(SELECTORS.circleContent)
      .eq(-1)
      .find(SELECTORS.smallCircle)
      .should("contain", "123")
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circle)
      .should("have.length", INITIAL_DATA.length + 1)
      .eq(-1)
      .should("contain", "123")
      .should("have.css", "border", STYLES.modifiedBorder)
      .wait(SHORT_DELAY_IN_MS)
      .should("have.css", "border", STYLES.defaultBorder);
    cy.get(SELECTORS.circleContent).eq(-1).contains("tail");
  });

  it("корректно работает удаление элемента из head", () => {
    cy.get(SELECTORS.deleteHeadButton).click();
    cy.get(SELECTORS.circleContent)
      .eq(0)
      .should("contain", "")
      .find(SELECTORS.smallCircle)
      .should("contain", INITIAL_DATA[0])
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circle)
      .should("have.length", INITIAL_DATA.length - 1)
      .eq(0)
      .should("contain", INITIAL_DATA[1])
      .should("have.css", "border", STYLES.defaultBorder);
  });

  it("корректно работает удаление элемента из tail", () => {
    cy.get(SELECTORS.deleteTailButton).click();
    cy.get(SELECTORS.circleContent)
      .eq(-1)
      .should("contain", "")
      .find(SELECTORS.smallCircle)
      .should("contain", INITIAL_DATA[3])
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circle)
      .should("have.length", INITIAL_DATA.length - 1)
      .eq(-1)
      .should("contain", INITIAL_DATA[2])
      .should("have.css", "border", STYLES.defaultBorder);
  });

  it("корректно работает добавление элемента по индексу", () => {
    cy.get(SELECTORS.input).type("123");
    cy.get(SELECTORS.indexInput).type("2");
    cy.get(SELECTORS.addByIndexButton).click();

    cy.get(SELECTORS.circleContent)
      .eq(0)
      .find(SELECTORS.smallCircle)
      .should("contain", "123")
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circleContent)
      .eq(0)
      .find(SELECTORS.smallCircle)
      .should("not.exist");
    cy.get(SELECTORS.circle)
      .eq(0)
      .should("have.css", "border", STYLES.changingBorder);

    cy.get(SELECTORS.circleContent)
      .eq(1)
      .find(SELECTORS.smallCircle)
      .should("contain", "123")
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circleContent)
      .eq(1)
      .find(SELECTORS.smallCircle)
      .should("not.exist");
    cy.get(SELECTORS.circle)
      .eq(1)
      .should("have.css", "border", STYLES.changingBorder);

    cy.get(SELECTORS.circleContent)
      .eq(2)
      .should("contain", INITIAL_DATA[2])
      .find(SELECTORS.smallCircle)
      .should("contain", "123")
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circleContent)
      .eq(2)
      .find(SELECTORS.smallCircle)
      .should("not.exist");
    cy.get(SELECTORS.circle)
      .should("have.length", INITIAL_DATA.length + 1)
      .eq(2)
      .should("contain", "123")
      .should("have.css", "border", STYLES.modifiedBorder);
    cy.get(SELECTORS.circle).eq(3).should("contain", INITIAL_DATA[2]);
  });

  it("корректно работает удаление элемента по индексу", () => {
    cy.get(SELECTORS.indexInput).type("2");
    cy.get(SELECTORS.deleteByIndexButton).click();

    cy.get(SELECTORS.circle)
      .eq(0)
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circle)
      .eq(1)
      .should("have.css", "border", STYLES.changingBorder);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(SELECTORS.circleContent)
      .eq(2)
      .should("contain", "")
      .find(SELECTORS.smallCircle)
      .should("contain", INITIAL_DATA[2])
      .should("have.css", "border", STYLES.changingBorder);
    cy.get(SELECTORS.circle).should("have.length", INITIAL_DATA.length - 1);
  });
});
