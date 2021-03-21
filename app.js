var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken("APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327");
mercadopago.configurations.configure({
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});


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

    console.log('log_PREFERENCE: ', req.body);
    console.log('RESPOSTA: ', res);

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
			success: "https://rafaelzanetti-username-mp-com.herokuapp.com/success/feedback",
			failure: "https://rafaelzanetti-username-mp-com.herokuapp.com/failure/feedback",
			pending: "https://rafaelzanetti-username-mp-com.herokuapp.com/pending/feedback"
		},
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                }
            ],
            installments: 6
        },
        id: "",
        notification_url: "https://webhook.site/3210fb56-102a-4680-b598-8d150d7bace2",
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


/**---------------------------------- */
app.get('/detail', (req, res) => {
    res.render('detail', req.query);
});

app.get('/success/feedback', (req, res) => {
    res.render('success', req.query);
});

app.get('/failure/feedback', (req, res) => {
    res.render('failure', req.query);
});

app.get('/pending/feedback', (req, res) => {
    res.render('pending', req.query);
});
/**---------------------------------* */


app.listen(port);