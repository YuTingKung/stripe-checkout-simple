const addToCartList = document.getElementsByClassName("addToCart")
var button = document.getElementsByClassName("checkout")[0];
var cancel = document.getElementsByClassName("cancel")[0];
var cart = document.getElementsByClassName("fa-shopping-cart")[0];
var count = document.getElementsByClassName("count")[0];
var shop = document.getElementsByClassName("container")[0];
var total = document.getElementsByClassName("total")[0];
var nameItem = document.getElementsByClassName("name");
var items = [];
for (var i = 0; i < addToCartList.length; i++) {
  addToCartList[i].addEventListener("click", function(e) {
    var find = items.find(i => i.id == e.target.value);
    if (find) {
      find.quantity += 1;
    } else {
      items.push({ id: e.target.value, quantity: 1 });
    }
    shop.innerHTML = '';
    total.innerHTML = '';
    sum = 0;
    items.forEach(q => {
      money = (Number(q.id)+10)*q.quantity;
      sum += money;
      colorHtml = nameItem[q.id-1].innerHTML;
      shop.innerHTML += `<div class="inside-cart"><div style="background-color: ${colorHtml}; height: 30px; width: 30px; margin: 10px;"></div><p>${colorHtml} x ${q.quantity} = $ ${money}</p></div>`;
    });
    total.appendChild(document.createTextNode(`$ ` + sum));
    count.innerHTML = items.map(a => a.quantity).reduce((a, b) => a + b);
  })
}
cart.addEventListener("click", ()=> {
  var v = document.getElementById('modal').style.visibility;
  if (v == 'visible') {
    document.getElementById('modal').style.visibility = 'hidden';
  } else {
    document.getElementById('modal').style.visibility = 'visible';
  }
  
})
button.addEventListener("click", () => {
  fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items,
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
cancel.addEventListener("click", () => {
  count.innerHTML = 0;
  items = [];
  shop.innerHTML = '';
  total.innerHTML = '';
})
