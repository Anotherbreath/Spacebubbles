/// <reference types = 'cypress'/>
describe('Our first test suit', () => {
    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //by Tag Name
        cy.get('input')
        //by ID
        cy.get('#inputEmail1')
        //by Class name (part of the class values is enought)
        cy.get('.input-full-width')
        //by Attribute name 
        cy.get('[placeholder]')
        //by Attribute name and Value
        cy.get('[placeholder = "Email"]')
        //by Class value (full value of the class) 
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')
        //by two different attributes 
        cy.get('[placeholder = "Email"][fullwidth]')
        //by Tag name, Attribute with Value, ID and Class name
        cy.get('input[placeholder = "Email"]#inputEmail1.input-full-width')
        //The most recommended way by Cypress - create your own attributes
        cy.get('[data-cy="imputEmail1"]')

    })
    it("Test 2", () => {

        cy.visit('/')
        cy.get('[class="logo-container"]')
            .parents('div')
            .find('rect[x="3"]')
            .click({ multiple: true })
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="SignInButton"]')
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click({ force: true })

    })

    it("then and wrap methods", () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains("nb-card", 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains("nb-card", 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    })
    it('Ebal rot etogo syntaxa', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', "Using the Grid").then(firstForm => {
            const emailLabelFirst = firstForm.find('[for = "inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should("contain", "Password")
            })
        })
    })
    it('Invoke test 1', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
            cy.get('[for="exampleInputEmail1"').invoke('text').then(text => {
                expect(text).to.equal('Email address')
                cy.contains('nb-card', 'Basic form')
                    .find('nb-checkbox')
                    .click()
                    .find('.custom-checkbox')
                    .invoke('attr', 'class')
                    .should('contain', 'checked')
            })

        })

    })

    it('Invoke test 2', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains("nb-card", 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('22').click()
            cy.wrap(input).invoke("prop", "value").should('contain', 'Feb 22, 2022')
        })
    })
    it('Radio button test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({ force: true })
                .should('be.checked')
            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })
            cy.wrap(radioButtons)
                .first()
                .should("not.be.checked")
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })
    it('Checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({ force: true })
    })
    it('Lists and dropdowns', () => {
        cy.visit('/')

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                const colors = {
                    'Light': "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    'Cosmic': 'rgb(50, 50, 89)',
                    'Corporate': "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) { cy.wrap(dropdown).click() }


            })

        })

        //cy.get('nav nb-select').click()
        //cy.get('.options-list').contains('Dark').click()
        //cy.get('nav nb-select').should('contain', 'Dark')
        //cy.get('nb-layout-header nav').should('have.css', "background-color", 'rgb(34, 43, 69)')


    })
    it.only("Web tables", () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('[class=nb-checkmark]').click()
            cy.wrap(tableRow).find('td').eq(6).should("contain", '25')
        })
    })
})