const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const port=process.env.PORT || 3030;

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/demo",(req,res)=>{
    res.sendFile("/Users/LOKESH/Desktop/WEB-SERVER/Demo/demo.html")
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){

    var cityName=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=236cebf378737f64810e2d72a4a8122d&units=metric";
    https.get(url,function(response){

        const x=response.statusCode;
        if(x>=200 && x<=299)
        
        {
            response.on("data",function(data){
                const weaterData=JSON.parse(data);
                var temp=Number(weaterData.main.temp);
                var humidity=Number(weaterData.main.humidity);
                var pressure=Number(weaterData.main.pressure);
                var windSpeed=Number(weaterData.wind.speed);
                var clouds=Number(weaterData.clouds.all);
                var city=weaterData.name;
                var weatherDescription=weaterData.weather[0].description;

                const icon=weaterData.weather[0].icon;
                const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                

                res.render("result.ejs",{
                    CityName:city,
                    temperature:temp,
                    Humidity:humidity,
                    Pressure:pressure,
                    WindSpeed:windSpeed,
                    Clouds:clouds,
                    weatherDescription:weatherDescription,
                    iconurl:iconurl
                })
            })
        }

        else
        {
            res.render("error.ejs",{reason:"city not found"})
        }
    })



    console.log(cityName);
})

app.post("/back",(req,res)=>{
    res.redirect("/");
})


// multipart or formdat
var multer = require('multer');
var upload = multer();
// // for parsing multipart/form-data
app.use(upload.array("file")); 

app.post("/formdata",(req,res)=>{
    const body=req.body;
    console.log(body)
    // console.log(req.file)
    const file=req.files[0];
    const buffer=file.buffer;
    console.log(buffer)
    console.log(buffer.toString())
})

app.listen(port,function(){
    console.log(`server started width ${port}`)
});
