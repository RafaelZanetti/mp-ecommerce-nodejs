//Manipula a chamada para o back-end e gera preferência.
var elMpButton = document.getElementsByClassName('mercadopago-button');
var numButtons = elMpButton.length;

//console.log(elMpButton);
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

                /*$(".shopping-cart").fadeOut(500);
                setTimeout(() => {
                    $(".container_payment").show(500).fadeIn();
                }, 500);*/
            })
            .catch(function() {
                alert("Unexpected error");
                //$('.mercadopago-button').attr("disabled", false);
                //$('.mercadopago-button').show();
            });
    });
}

  //Criar preferência ao clicar no botão checkout
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
     //O domínio de origem deve ser preenchido de acordo com o site ao qual você está se integrando.
     // Por exemplo: para a Argentina ".com.ar" ou para o Brasil ".com.br".
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
    
    $("#button-checkout").append( "<h3>" + "R$ " + amount +"</h3>" );

    $('.as-filter-button').hide();
    $('.as-accessories-filter-tile').append('<h2>Resumo do Pedido</h2>');

    $('.mini-gallery .as-producttile-image').css({ "width": "150px", "height": "150px"});
    
   
    //let description = document.getElementById('details--title').innerHTML;
    
    //let elQuantity = document.querySelector("#summary-quantity");
    //document.querySelector(".details--title").innerHTML = description;
    //document.querySelector(".item-name").appendChild(elQuantity);
  
    //document.getElementById("cart-total").innerHTML = "R$ " + amount;
    //document.getElementById('details--price').innerHTML = 'R$ ' + unitPrice;
    //document.getElementById('details--unit').innerHTML = quantity;
    //document.getElementById("summary-total").innerHTML = "R$ " + amount;
  }

  //Lidar com atualização de preço
  /*function updatePrice() {
    let quantity = document.getElementById('details--unit').innerHTML;
    let unitPrice = document.getElementById('details--price').innerHTML
    //let amount = parseInt(unitPrice) * parseInt(quantity);

    //let description = document.getElementById('details--title').innerHTML;
    
    //let elQuantity = document.querySelector("#summary-quantity");
    //document.querySelector(".details--title").innerHTML = description;
    //document.querySelector(".item-name").appendChild(elQuantity);
  
    //document.getElementById("cart-total").innerHTML = "R$ " + amount;
    document.getElementById('details--price').innerHTML = 'R$ ' + unitPrice;
    document.getElementById('details--unit').innerHTML = quantity;
    //document.getElementById("summary-total").innerHTML = "R$ " + amount;
  }
  document.getElementById('details--unit').addEventListener('change', updatePrice);
  updatePrice();*/
  
  //voltar
  /*document.getElementById("go-back").addEventListener("click", function() {
    $(".container_payment").fadeOut(500);
    setTimeout(() => {
        $(".shopping-cart").show(500).fadeIn();
    }, 500);
    $('#checkout-btn').attr("disabled", false);
  });*/