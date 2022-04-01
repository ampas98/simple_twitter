
// TODO check if this works
const {migrate}=require('./migrations') //Importing the file creates the tables
const {seedData}=require('./seed_test_data')
migrate().then(seedData);
// seedData();