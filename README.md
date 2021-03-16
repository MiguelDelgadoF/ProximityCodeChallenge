# Description
    This is a API with a single endpoint to upload a CSV file process thm and then import the data to our database, also the user needs to give the provider name to store them and be able to sort by provider name
# Assumptions
    We assump that the CSV will have the columns with the same header that we see in the requirements, also we dont have a config for column layout cause the librery that we choose can read the CSV file in all formats and the libriry gets all the columns and convert to an object, then we send that object to be stored in the mongodb instance
# Design decisions
    We decide to hake a abstract class to manaje responses and implementation for all the controllers to have a standart in the controllers and be more organized, then we decide to save the CSV with a simple combination of a timestamp and original name; For the middleware we decide to use multer, that will help us to store the file and filter the file formats. 
    Then as a suggestion we use mongodb-memory-server, we create a database handler to make it simple and practical with methods to connect, close and empty the database
# Usage
    The usage its very simple you just need to open a terminal and run `npm run start` and the server will be online, and if you make changes the server will automatic restart for implement the changes 
# Endpoint description
    The application only have a single endpoint that its `http://localhost:3000/api/csv/upload` and acepts a file key with th CSV and a provider key with the provider name, if the CSV upload its succefull will return a json response with a messsage and 200 code status
# How to test
    To test the application its simple just open the terminal in the project location and run `npm test` to run all the test in the test folder