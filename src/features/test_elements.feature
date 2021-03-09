@regression
Feature: Elements on test automation website
        
        Scenario: Ensure I can click the button and be redirected to correct URL
            Given I navigate to http://webdriveruniversity.com/index.html
             When I click the element with id udemy-promo-code-thumbnail
             Then I should see current page URL matches automation-testing-javascript-webdriverio-selenium-more

        Scenario: Ensure I can click the button and see the modal contains text
            Given I navigate to http://webdriveruniversity.com/Click-Buttons/index.html
             When I click the element with id button1
             Then I expect the element with id myModalClick to contain the text Congratulations!

             