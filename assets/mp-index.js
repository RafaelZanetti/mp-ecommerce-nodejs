//Manipula a chamada para o back-end e gera preferência.
var elMpButton = document.getElementsByClassName("mercadopago-button");

console.log(elMpButton);

elMpButton.addEventListener("click", function() {
    alert("entrou no click");
    $('.mercadopago-button').attr("disabled", true);

    var orderData = {
        quantity: document.getElementsByName("unit").value,
        description: document.getElementsByName("title").value,
        price: document.getElementsByName("price").value
    };
      
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
                $(".shopping-cart").fadeOut(500);
                setTimeout(() => {
                    $(".container_payment").show(500).fadeIn();
                }, 500);
            })
            .catch(function() {
                alert("Unexpected error");
                $('.mercadopago-button').attr("disabled", false);
            });
  });
  
  //Criar preferência ao clicar no botão checkout
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
     //O domínio de origem deve ser preenchido de acordo com o site ao qual você está se integrando.
     // Por exemplo: para a Argentina ".com.ar" ou para o Brasil ".com.br".
    script.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementsByClassName("mercadopago-button").innerHTML = "";
    document.querySelector(".mercadopago-button").appendChild(script);
  }
  
  //Lidar com atualização de preço
  function updatePrice() {
    let quantity = document.getElementsByName("unit").value;
    let unitPrice = document.getElementsByName("price").value;
    //let amount = parseInt(unitPrice) * parseInt(quantity);
  
    let description = document.getElementsByName("title").value;
    
    //let elQuantity = document.querySelector("#summary-quantity");
    document.querySelector(".details--title").innerHTML = description;
    //document.querySelector(".item-name").appendChild(elQuantity);
  
    //document.getElementById("cart-total").innerHTML = "R$ " + amount;
    document.querySelector(".details--price").innerHTML = "R$ " + unitPrice;
    document.querySelector(".details--unit").innerHTML = quantity;
    //document.getElementById("summary-total").innerHTML = "R$ " + amount;
  
    
  }
  document.querySelector("quantity").addEventListener("change", updatePrice);
  updatePrice();  
  
  //voltar
  document.getElementById("go-back").addEventListener("click", function() {
    $(".container_payment").fadeOut(500);
    setTimeout(() => {
        $(".shopping-cart").show(500).fadeIn();
    }, 500);
    $('#checkout-btn').attr("disabled", false);  
  });