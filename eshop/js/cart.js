var cart={};//корзина

$.getJSON('goods.json', function(data){
  var goods=data;//все товары в массиве
  //console.log(goods);
  checkCart();
   //console.log(cart);
  showCart(); //вывод товаров на страницу
  
function showCart(){
  if($.isEmptyObject(cart)){
    //корзина пуста
    var out='Корзина пуста. Добавьте товар в корзину <a href="index.html">Главная страница</a>';
    $('#my-cart').html(out);
      }
  else{
  var out='';
  for (var key in cart){
    out+='<button class="delete" data-art="'+key+'">x</button>';
    out+='<img src="'+goods[key].image+'"width="48">'; 
    out+=goods[key].name; 
    out+='<button class="minus" data-art="'+key+'">-</button>';
    out+= cart[key];
    out+='<button class="plus" data-art="'+key+'">+</button>';
    out+= cart[key]*goods[key].cost;
    out+= '<br>';
  }
  $('#my-cart').html(out);
  $('.plus').on('click', plusGoods);
  $('.minus').on('click', minusGoods);
  $('.delete').on('click', deleteGoods);
  }
  }

  function plusGoods(){
    var artyicul=$(this).attr('data-art');
    cart[artyicul]++;
    saveCartToLS();//сохраняет корзину в localStorage
    showCart();
  }

   function minusGoods(){
    var artyicul=$(this).attr('data-art');
     if(cart[artyicul]>1) {
       cart[artyicul]--;
     }
     else {
       delete cart[artyicul];
     }
     saveCartToLS(); //сохраняет корзину в localStorage
    showCart();
  }

   function deleteGoods(){
    var artyicul=$(this).attr('data-art');
    delete cart[artyicul];
    saveCartToLS(); //сохраняет корзину в localStorage
    showCart();
  }
  
});
function checkCart(){
  //проверяю наличие корзины в localStorsge 
  if(localStorage.getItem('cart') !=null) {
    cart=JSON.parse(localStorage.getItem('cart'));
  }
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart));
}