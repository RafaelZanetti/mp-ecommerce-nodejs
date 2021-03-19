var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken("APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327"); 

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

//*--------------------//
//MP Integration
app.post("/create_preference", (req, res) => {

    console.log('log_PREFERENCE', req.body);

	let preference = {
        collector_id: 725736327,
		items: [{
            id: 1234,
			title: req.body.description,
            description: "Celular de Tienda e-commerce",
            picture_url: "https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg",
            category_id: "art",
            currency_id: "BRL",
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_92801501@testuser.com",
            date_created: "",
            phone: {
                area_code: "55",
                number: 985298743
            },
            identification: {
                type: "CPF",
                number: "19191919100"
            },
            address: {
                street_name: "Insurgentes Sur",
                street_number: 1602,
                zip_code: "78134-190"
            }
        },        
		back_urls: {
			"success": "http://localhost:8080/pages/success/index.html?feedback",
			"failure": "http://localhost:8080/pages/failure/index.html?feedback",
			"pending": "http://localhost:8080/pages/pending/index.html?feedback"
		},
        notification_url: "https://webhook.site/31d8362e-f603-476d-ae87-30e1648e22b4",
        statement_descriptor: "MERCADOPAGO",
        external_reference: "rafa_zanetti_c@hotmail.com",
		auto_return: 'approved',
	};

    console.log(preference);

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function(request, response) {
    response.json({
       Payment: request.query.payment_id,
       Status: request.query.status,
       MerchantOrder: request.query.merchant_order_id
   })
});
//*-----------------------------------//


app.get('/detail', function (req, res) {
    res.render('detail', req.query);

    console.log(req.query);
});

/**----------------------------------------- */
//MP Integration

/*mercadopago.configurations.setAccessToken("APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327"); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client"));

app.get("/", function (req, res) {
  res.status(200).sendFile("index.html");
}); 

app.post("/create_preference", (req, res) => {

	let preference = {
        collector_id: 725736327,
		items: [{
            id: 1234,
			title: req.body.description,
            description: "Celular de Tienda e-commerce",
            picture_url: "https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg",
            category_id: "art",
            currency_id: "BRL",
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_92801501@testuser.com",
            date_created: "",
            phone: {
                area_code: "55",
                number: 985298743
            },
            identification: {
                type: "CPF",
                number: "19191919100"
            },
            address: {
                street_name: "Insurgentes Sur",
                street_number: 1602,
                zip_code: "78134-190"
            }
        },        
		back_urls: {
			"success": "http://localhost:8080/pages/success/index.html?feedback",
			"failure": "http://localhost:8080/pages/failure/index.html?feedback",
			"pending": "http://localhost:8080/pages/pending/index.html?feedback"
		},
        notification_url: "https://webhook.site/31d8362e-f603-476d-ae87-30e1648e22b4",
        statement_descriptor: "MERCADOPAGO",
        external_reference: "rafa_zanetti_c@hotmail.com",
		auto_return: 'approved',
	};

    console.log(preference);

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function(request, response) {
	 response.json({
		Payment: request.query.payment_id,
		Status: request.query.status,
		MerchantOrder: request.query.merchant_order_id
	})
});*/

/**----------------------------------------- */


app.listen(port);