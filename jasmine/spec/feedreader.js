/* feedreader.js

//general resource: https://jasmine.github.io/2.2/introduction
//general resource: https://www.w3schools.com/jsref/prop_html_classname.asp

*
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        //tests to make sure that the allFeeds variable has been defined and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds).not.toBeNull(true);
        });

        //loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty
        it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull(true);
            }
        });

        //loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull(true);
            }
        });
    });

    describe('The menu', function() {
        let body = document.querySelector('body');
               
        //ensures the menu element is hidden by default
        it('is hidden by default', function() {
            console.log(body.className);
            expect(body.className).toContain('menu-hidden');     
        });

         //ensures the menu changes visibility when the menu icon is clicked and hides when clicked again
        it('is displayed when clicked', function() {
            let hamburger = document.querySelector('.menu-icon-link');
            
            // when hamburger menu icon clicked, body does not contain menu-hidden class 
            hamburger.click();
            console.log('menu clicked');
            console.log(body.className);
            expect(body.className).not.toContain('menu-hidden');
             
            // when hamburger menu icon clicked again, body contains menu-hidden class
            hamburger.click();
            console.log('menu clicked again');
            console.log(body.className);
            expect(body.className).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        //ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container - (loadFeed() is asynchronous)
        beforeEach(function (done){
            loadFeed(0, done);
        });

        it('loadFeed complete', function() {
            let feed = document.querySelector('.entry-link');
            expect(feed).not.toBeNull(true);
            console.log(feed);
        });
    });

    describe('New Feed Selection', function() {
        //ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        let oldFeed;
        let newFeed;
        let feed = document.querySelector('.feed');
        
        beforeEach(function (done){
            loadFeed(0, function () {
            oldFeed = feed.children[0].innerText; 
                    
            loadFeed(1, function() {
            newFeed = feed.children[0].innerText;
            done();  
            })});
        });

        it('content updates', function() {
            expect(oldFeed === newFeed).toBe(false);
            console.log(oldFeed);
            console.log(newFeed);
        });
    });
});