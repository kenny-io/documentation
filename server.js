const app = require('express')();
const bodyParser = require('body-parser');
const models = require('./models');
const Op = models.Sequelize.Op;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // @ts-ignore
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 8000;


app.post("/thumbs-up", function(req, res){
    const url  = req.body.url;

    models.Rating.findAll({
        where: {
            url
        }
    }).then(page => {
        if(page.length === 0 ){
            models.Rating.create({
                url,
                thumbs_up:1,
                thumbs_down:0,
                total:1,
        
            }).then(result => {
                console.log("created rating page", result)
                res.send({
                    status:"success",
                    message:"thumbs up has been inserted"               
                })
            }).catch(err => res.send({
                status:"error",
                message:"there was an eror in inserting thumbs up "+ err               
            }))
        }else{
            console.log("Page values",  page[0].dataValues);
            let up =  page[0].dataValues.thumbs_up + 1;
            let t = up - page[0].dataValues.thumbs_down;

            models.Rating.update({
                thumbs_up: up,
                total:t,
              }, {
                where: {
                    url
                }
              }).then(result => {
                  console.log("Updated values", result);
                res.send({
                    status:"success",
                    message:"thumbs up has been updated"               
                })
              }).then(err => 
                res.send({
                    status:"error",
                    message:"there was an eror in updating thumbs up"+ err               
                }))
        }
    })
   
})

app.get("/content", function(req, res){
    const path = "v3/" + req.query.path;
    try{
        models.Algolia.findAll({
            where: {
                path
            }
        }).then(data =>{
            res.status(200);
            res.send({
                status:"success",
                data         
            })
        }).catch( err => console.log(err))

    }catch(err){
        console.log(err);
    }
})

app.get("/v1/session", function(req, res){
    const mockSuccessProfile = {
        exists: true,
        profile: {
          id: "123",
          names: [{ id: "123", first: "Anmol", last: "Maini" }],
          emails: [{ id: "123", address: "anmol.maini@gmail.com", verified: true }],
          phones: [
            { id: "123", country_code: "+1", number: "4422450480", verified: true }
          ],
          addresses: [
            {
              id: "123",
              address_1: "1 Hawthorne St",
              address_2: "Unit 14E",
              city: "San Francisco",
              company: "",
              country: "United States",
              name: { id: "123", first: "Anmol", last: "Maini" },
              phone: {
                id: "123",
                country_code: "+1",
                number: "4422450480",
                verified: true
              },
              state: "California",
              zip: "94105",
              country_code: "US",
              state_code: "CA",
              latitude: "",
              longitude: ""
            }
          ],
          payment_sources: [
            {
              id: "",
              token: "pm_1Hfhdbsbagdvab",
              brand: "Visa",
              country: "US",
              kind: "credit",
              last_four: "4242",
              expiry_month: 11,
              expiry_year: 2022
            }
          ]
        }
      };
    res.send(mockSuccessProfile);
})

app.post("/thumbs-down", function(req, res){
    const url  = req.body.url;

    models.Rating.findAll({
        where: {
            url
        }
    }).then(page => {
        if(page.length === 0 ){
            models.Rating.create({
                url,
                thumbs_up:0,
                thumbs_down:1,
                total:1,
        
            }).then(result => {
                console.log("created rating page", result)
                res.send({
                    status:"success",
                    message:"thumbs down has been inserted"               
                })
            }).catch(err => 
                res.send({
                    status:"error",
                    message:"there was an eror in inserting thumbs down"+ err               
                })
                )
        }else{
            console.log("Page values",  page[0].dataValues);
            let up =  page[0].dataValues.thumbs_up;
            let down =  page[0].dataValues.thumbs_down + 1;
            let t = up - down;

            models.Rating.update({
                thumbs_down: down,
                total:t,
              }, {
                where: {
                    url
                }
              }).then(result => {
                  console.log("Updated values", result);
                res.send({
                    status:"success",
                    message:"thumbs down has been updated"               
                })
              }).then(err => 
                    res.send({
                        status:"error",
                        message:"there was an eror in updating thumbs down"+ err               
                    })
                )
        }
    })

})

app.listen(port, () => console.log(`server is listening on port ${port}!`))