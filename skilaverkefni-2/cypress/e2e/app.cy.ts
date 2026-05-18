describe('Team Task Hub', () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.visit('/')
    })
  
    it('creates a project, adds a task, and marks it complete', () => {
      // Click the + New button to create a project
      cy.contains('+ New').click()
  
      // Fill in the project name
      cy.get('input').first().type('My Test Project')
  
      // Submit the form
      cy.contains('button', 'Create').click()
  
      // The project should appear in the sidebar
      cy.contains('My Test Project').should('exist')
  
      // Click on the project to select it
      cy.contains('My Test Project').click()

      
  
     // Add a task
    cy.contains('+ New Task').click()

    // Wait for the dialog and type in the title field
cy.get('input#title').type('My First Task')

// Submit the task form
cy.contains('button', 'Create Task').click()

      // The task should appear
      cy.contains('My First Task').should('exist')
  
      // Mark the task as complete
      cy.contains('My First Task')
        .closest('div')
        .find('input[type="checkbox"]')
        .click()
  
      // The task title should now have line-through
      cy.contains('My First Task').should('have.class', 'line-through')
    })
  })