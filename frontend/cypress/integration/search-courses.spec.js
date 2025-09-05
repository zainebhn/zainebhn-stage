describe("Search courses", () => {
    
    const expected_courses = [
        {
            title: "The Rust Programming Language",
            upvotes: "6",
            topic: "Rust"
        },
        {
            title: "Intro to the Rust programming language",
            upvotes: "5",
            topic: "Rust"
        }
    ];

    it("Load search page", () => {
        cy.visit("http://localhost:3000");
        // Wait for page to load (optional)
        cy.get("#rc_select_0", { timeout: 10000 }).should("be.visible");
    });
    
    it("Type the course", () => {
        cy.get("#rc_select_0").type("rust{enter}");
        // Wait for results to appear
        cy.get(".ant-list-item", { timeout: 10000 }).should("have.length.greaterThan", 0);
    });
     
    it("Compare search results", () => {
        // Loop through expected courses
        expected_courses.forEach((course, index) => {
            cy.get(".ant-list-item")   // get all list items
              .eq(index)               // pick the item at position index
              .within(() => {
                  // Check the title
                  cy.get(".ant-list-item-meta-title > a")
                    .should("contain.text", course.title);

                  // Check the topic
                  cy.get(".ant-tag > span")
                    .should("contain.text", course.topic);
              });
        });
    });

});

