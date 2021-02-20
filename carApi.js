const functions = require("firebase-functions");
var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
const port = 2410;
exports.app = functions.https.onRequest(app);
let allCars = require("./carData.js").listOfCar;
let allCarsDetails = require("./carData.js").detailsOfCar;
app.get("/carmaster",function(req,res)
{
  let outArr = allCars;
  res.send(outArr);
});
app.get("/cars",function(req,res)
{
  let outArr = allCarsDetails;
  res.send(outArr);
});
app.get("/cars/features",function(req,res)
{
  let minPrice = +req.query.minprice
  let maxPrice = +req.query.maxprice
  let fuel1 = req.query.fuel;
  let type1 = req.query.type;
let sorting = req.query.sort;
  let outArr = allCarsDetails;
  if(minPrice){
outArr = outArr.filter(a => a.price >= minPrice)
  }
if(maxPrice){
  outArr = outArr.filter(a => a.price <= maxPrice)
}
if(fuel1){
  let tempArray=[]
  let a = allCars.filter(a => a.fuel == fuel1);
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < outArr.length; j++) {
      if (a[i].model == outArr[j].model) {
        tempArray.push(outArr[j]);
      }
    }
  }
  outArr = tempArray;
}
if(type1){
  let tempArray=[]
  let a = allCars.filter(a => a.type == type1);
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < outArr.length; j++) {
      if (a[i].model == outArr[j].model) {
        tempArray.push(outArr[j]);
      }
    }
  }
  outArr = tempArray;
}
if(sorting !==undefined){
  if(sorting == 'kms'){
 outArr.sort(function(a,b){
   return b.kms - a.kms
 })
  }
  if(sorting=='price'){
    outArr.sort(function(a,b){
      return b.price - a.price
    })
     }
     if(sorting=='year'){
      outArr.sort(function(a,b){
        return b.year - a.year
      })
       }
}


res.send(outArr);
});
app.get("/cars/:carid?", function(req, res) {
  let cusid = req.params.carid;
  console.log(cusid)
  var searched = outArr.find(p=>p.id==cusid);
  res.send(searched);
});
app.post("/cars",function(req,res)
{
  let body  = req.body
  allCars.push(body);
  res.send(body);
});
app.put("/cars/:carid?", function(req, res) {
  let body = req.body;
  let cusid = req.params.carid;
  console.log(cusid)
  var index = outArr.findIndex(p=>p.id==cusid);
  outArr.splice(index,1,body);
  res.send(outArr);
});
app.delete("/cars/:carid?", function(req, res) {
  let cusid = req.params.carid;
  console.log(cusid)
 var index = outArr.findIndex(p=>p.id == cusid);

 outArr.splice(index,1)

  res.send(outArr);
});
app.delete("/carmaster", function(req, res) {
let arr= allCars

  res.send(arr);
});
