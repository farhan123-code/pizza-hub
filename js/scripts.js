$(document).ready(function () {
  $(".clickable").click(function () {
    $(".initially-showing").toggle();
  });
});

function Pizza(size, crust) {
  this.size = size;
  this.crust = crust;
  this.toppings = [];
}

function Location(name, estate) {
  this.name = name;
  this.estate = estate;
}

var sizePrice = {
  small: 500,
  medium: 750,
  large: 950,
  mega: 1200,
};

var toppingPrice = [
  {
    sauce: {
      small: 50,
      medium: 100,
      large: 150,
      mega: 200,
    },
    cheese: {
      small: 100,
      medium: 150,
      large: 200,
      mega: 250,
    },
    beef: {
      small: 150,
      medium: 200,
      large: 300,
      mega: 300,
    },
  },
];

var crustPrice = {
  gluten: 0,
  original: 100,
  stuffed: 150,
  american: 250,
  cheesy: 350,
};

function sizeCalcPrice(size) {
  if (size === "small") {
    return sizePrice.small * 1;
  } else if (size === "medium") {
    return sizePrice.medium * 1;
  } else {
    return sizePrice.large * 1;
  }
}

function crustCalcPrice(crust) {
  if (crust === "crispy") {
    return crustPrice.crispy * 1;
  } else if (crust === "stuffed") {
    return crustPrice.stuffed * 1;
  } else {
    return crustPrice.gluten * 1;
  }
}

function toppingsCalcPrice(toppings) {
  var noOfTopping = 0;
  for (i = 0; i < toppings.length; i++) {
    if (toppings[i] == "sauce") {
      noOfTopping += 125;
    }
    if (toppings[i] == "cheese") {
      noOfTopping += 175;
    }
    if (toppings[i] == "beef") {
      noOfTopping += 250;
    }
  }
  return noOfTopping * 1;
}

$(document).ready(function () {
  function getPizzasize() {
    return $("#pizza-size").find(":selected").val();
  }

  function getcrust() {
    return $("#pizza-crust").find(":selected").val();
  }

  function gettoppings() {
    var toppings = [];
    $(".toppings :checked").each(function () {
      toppings.push($(this).val());
    });
    return toppings;
  }

  $("#pizza").submit(function (event) {
    event.preventDefault();
    var pizzaSize = getPizzasize();
    var crust = getcrust();
    var toppings = gettoppings();

    var newPizza = new Pizza(pizzaSize, crust);
    newPizza.toppings.push(toppings);
    $("#table").show();
    $(".checkout").show();
    var oneOrder =
      sizeCalcPrice(pizzaSize) +
      crustCalcPrice(crust) +
      toppingsCalcPrice(toppings);

    $("#items").append(
      "<tr>" +
        "<td>" +
        newPizza.size +
        "</td>" +
        "<td>" +
        "<p>" +
        newPizza.crust +
        "</p>" +
        "</td>" +
        "<td>" +
        newPizza.toppings +
        "</td>" +
        "<td>" +
        oneOrder +
        "</td>" +
        "</tr>"
    );
  });
  var totalQuantity = parseInt($("#quantity").val());

  function calcTotal() {
    var priceOnePizza =
      sizeCalcPrice(getPizzasize()) +
      crustCalcPrice(getcrust()) +
      toppingsCalcPrice(gettoppings());
    return priceOnePizza;
  }
  var pizzaList = [];

  $("#orderbtn").click(function () {
    totalQuantity += 1;
    $("#quantity").text(totalQuantity);
    pizzaList.push(calcTotal());
  });

  $("#gettotal").click(function () {
    var total = 0;
    pizzaList.forEach(function (pizza) {
      total += pizza;
    });
    $("#money").text(total);
  });

  $("#myModel").click(function () {
    var deliver = confirm("Would you like us to deliver?");
    if (deliver) {
      var place = prompt("Enter your location");
      $("#place").text(place);
      $("#success").show();
      alert("Delivery fee is Ksh 200");
    } else {
      $("#no-delivery").show();
    }

    $("#pizza-size").val("");
    $("#pizza-crust").val("");
    $("#items").remove();
    $("#items").text(0);
  });
});
