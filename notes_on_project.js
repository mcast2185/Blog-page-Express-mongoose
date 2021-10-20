



        //      the important thing to note here is that the logic itself is not hard           //
        //      to understand, we comprehend the majority of the applications progressive       //
        //      flow, however; in order for us to feel competent in creating the architecture,  //
        //      we must have a firm understanding over the vast nomenclature of the             //
        //      libraries/modules/frameworks we are leveraging in our work. only then will we   //
        //      be able to create applications to their fullest capability.                     //

        //      notes: do not forget that we changed all the objects sharing the same key       //
        //      and value names such as ({article: article}) to a cleaner look ({article})      //
        //      we learned this syntax has an identical functionality.                          //
        //      notes: be aware of code execution order. we must know when an async function    //
        //      is needed or being used, this can cause major problems if: in order for our     //
        //      app's major feature to run it needs the value of an async functions promise     //
        //      however since it hasnt processed yet our app stalls or crashes.
        //      use the async functions when dealing with large numbers of iterations or        //
        //      complex ones. simple loops or iterations dont need it. its slower.



//(server) two of our const variables created at the top our server file (express, mongoose) import the express and mongoose libraries 
// import the express and mongoose libraries another (articleRouter) imports a file within our directory and lastly, (app)
// we create an instance of our express import so to use/ manipulate on our file 
// 
// we create a connection to mongodb (more info when we get to it below)
//
// after establishing our server/framework and our database, we set the view engine to how our app will display its information
// (ejs) by means of the set() method
//
// we then leverage app.use()...
//
// afterwards, we attribute the get method to our app which we use to target the index route ('/') by means of using a middleware function
// that we use to respond to that path, when called. the data we create (articles) contains an array of objects that hold content we aim 
// to pass to our ejs index file. responding with a rendering method that targets the directory path, allowing ejs access to the values (articles) 
// within our variable above in the form of passing an object called by its key (articles) 
//
// we exercise the function of the .use() middleware once more to associate the path we gave to our articleRouter with the path '/articles' 
//
// with app.listen we simply tell our localhost where our port is located.
//
//(articles) 
//
//(ejs)
// use the bootstrap link to aid with css by using keyterms as class names. .
//
// since we want the link of new articles we created in our index file to take us to 
// to /articles/new, we create that path by creating a new.ejs file within our articles
// folder. we use the same html doc template and apply the div with the class container
// that is required from bootstrap.
// 
// we add our h1 tag with the custom class as well as our form tag that has the
// action and method attributes. action identifies the path to where our post method will be 
// handling the information 
// that means, in our articles.js file we have to then create a route from which the post method
// can be processed and managed (router.post()). post takes the '/' route as its argument
    // this part is a bit murky but how i think it works is that the action '/articles'
    // is giving us the route which all routes are handled by our articles.js file
    // within that file we process the forms input and create the path to where its directed
// then, instead of creating the html code for the form, which we know we will be reusing for our edit form
// as well, we create a new ejs file, a partial view file (it contains partially readable code meant only to be extracted)
// we render the code from that file by using our ejs syntax of ( <%- include() %> ) the hyphen use means that within
// the tag, whatever is being rendered will be actual html code. the include function
// identifies from where we will be getting the code.
// 
// we label our file that contains our partial ejs (_form_fields) its there where we create the code we intend to extract
// using div, label, textarea, input, a, and button tags, each of with containing their own custom bootstrap class
// we then provide additional and specific attributes to each tag, inserting an ejs tag into our input value="" and two more 
// ejs tags between both textarea fields. the only tags without a div to wrap them are the a and button tags
// the a tag servers as a button on the page that directs us back to the index ('/')
// our button tag initiates our forms route to articles where we previously created the router to which our post method would be 
// storing the data submitted, being the created article.
//
// this is where we go back to our server file and create our varible giving us access the mongoose library, its by way of this 
// variable that we can connect to mongodb, leveraging the connect method and passing ('mongodb://localhost/blog') the /blog represents 
// the name we chose for our database. we inserted mongoose.connect() after our variables, instead of the line number we were presently at, for the reason 
// how code is read. if our data is stored in the database but theres lines of code that need to be processed before, how
// will it process them?
//
// the next step is creating our model which is where we will be storing our articles being submitted
// so label our new folder (models) and inside of that folder we create our (article) file
// in here is where we will be managing the data of mongoose, so we import, then create a schema object for our model.
    // (In Mongoose, a schema is a configuration object for a model. Schemas do not allow you to read and write from MongoDB, that's what models are for.)
// we know what to pass here in the object from what post() is sending. (title,description,markdown) now we simply just have to pass each one
// a set of options or what we expect the input to be. so we know that we are expecting a string so we create the key (type:) for the three.
// we know that we absolutely need the title as well as the markdown, so we label our next key, (required:) set to true
// we also add (createdAt) to manage the dates the articles were created, having the value of type be (Date) and creating a 
// different key element (default) which accepts a function as its value, the value being (Date.now) without its parens
// we added the key element of default because the date will automatically be attached, by default, since there is no field to pass that information
// in order to use this articleSchema, we need to export this by setting module.exports equal to mongoose.model() passing in the
// name we chose for our model first then the schema/ the construct of our model. now we have established a table in our database 
// (Article) with specified columns that manage our data.
// 
// now that we have established how and where the articles will be stored, we need to go back to (articles.js) to create the route 
// for the posts to successfully pass through. we import the file containing our database from our directory (require('./../models/article')) 
// next, create the path with our post method, adding an instance variable of our Article/database, passing the key elements we set up
// and before passing the values, we must first switch over to our server file, and leverage our app along with the use() method once more
// passing (express.urlencoded({extended:false}))
    // (Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option)
    // how i interpret this: we are using router.post() to work with our database, and router is an express function method we created. when we use 
    // the express module to parse or for its leverage, it automatically querys from its library file, so when we pass the object ({extended: false}) 
    // it allows us to query the address string we have targeted after passing/ adding new string. allows the use of (req.body.)
// article.save() returns a promise/ async function, so since we are using our req, res function, we know that it too is async so we insert it above
// (router.post('/', async (req,res) => {})) by doing so, we can use await on article.save(), going on and redirecting to the page we created with string interpolation only when 
// successfully submitted and keeping us from our target page when it fails. within our try catch.
// we create the route to manage the successful res.redirect() just above. (its an async function so its fine that its above our code)
//



const express = require('express');
const Article = require('./models/article');
const router = express.Router();

router.post('/', async (req,res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        res.render('/articles/new', {article})
    }
})

module.exports = router;
