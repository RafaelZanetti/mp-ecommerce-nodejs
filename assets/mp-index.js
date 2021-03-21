//Manipula a chamada para o back-end e gera preferência.
var elMpButton = document.getElementsByClassName('mercadopago-button');
var numButtons = elMpButton.length;

console.log('numeroButtonPagamento: ', numButtons);

for (var i = 0; i < numButtons; i++) {
    elMpButton[i].addEventListener('click', function() {
    
        //alert("entrou no click");
        //$('.mercadopago-button').attr("disabled", true);
        //$('.mercadopago-button').hide();

        var orderData = {
            description: document.getElementById('details--title').innerHTML,
            quantity: document.getElementById('details--unit').innerHTML,
            price: document.getElementById('details--price').innerHTML
        };

        console.log('orderDATA-LOG: ', orderData);
        
        fetch("/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(preference) {
                createCheckoutButton(preference.id);

                $('#button-checkout-mp').hide();
                resumeCheckout();
            })
            .catch(function() {
                alert("Unexpected error");
                //$('.mercadopago-button').attr("disabled", false);
                //$('.mercadopago-button').show();
            });
    });
}

  //preference create
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
    script.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    script.dataset.buttonLabel = "Pague a compra";
    document.querySelector('#button-checkout').innerHTML = "";
    document.querySelector('#button-checkout').appendChild(script);
  }
  
  function resumeCheckout() {
    let quantity = document.getElementById('details--unit').innerHTML;
    let unitPrice = document.getElementById('details--price').innerHTML
    let amount = parseInt(unitPrice) * parseInt(quantity);

    let description = document.getElementById('details--title').innerHTML;

    $('.as-filter-button').hide();
    $('.as-producttile-tilelink').hide();
    $('#details--price').hide();
    $('#details--unit').hide();    

    $('.as-accessories-filter-tile').append('<h2>Resumo do Pedido</h2>');

    $('.mini-gallery .as-producttile-image').css({ "width": "150px", "height": "auto", "margin-top": "20px"});
    
    document.getElementById('details--resume-title').innerHTML = `${description} x ${quantity}  -  R$ ${amount}`;
    
    $("#button-checkout").append( "<h3>" + "Total  R$: " + amount +"</h3>" );
  }