require(['require.config'], () =>{
    require(['template','header','footer'], (template,header) => {
        class Cart{
            constructor(){
                this.init();
                this.count = 0;
            }
            init(){
                let cart = localStorage.getItem('cart');
                if(cart){
                    //渲染列表
                    cart = JSON.parse(cart);
                    this.delBtn();
                    this.render(cart);
                    this.bind();
                    this.click();
                    this.calcMoney();
                    this.wholeCheck();
                }else{
                    //提示购物车为空
                    alert("购物车为空");
                }
            }
            render(cart){
                $("#cart-container").html(template('cart-template', {cart}));
                $(".son-check").each(function(){
                    let dataChecked = $(this).attr('data-checked');
                    if(dataChecked === 'false'){
                        dataChecked = false;
                    }else{
                        dataChecked = true;
                    }
                    $(this).prop('checked',dataChecked);
                })
            }
            
            //增加数量
            bind(){
                let _this = this;
                //增加按钮
                $("#cart-container").on("click",".qtyBtnR", function() {
                    let value = $(this).prev().val();
                    value++;
                    $(this).prev().val(value);
                    if(value > 1){
                        $(this).prevAll(".qtyBtnL").css("background-color","#00539c");
                    }
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id =$(this).attr("data-id");
                    let index = -1;
                    cart.some((shop,i) =>{
                        index = i;
                        return shop.id == id;
                    });
                    cart[index].num = value;
                    localStorage.setItem('cart',JSON.stringify(cart));
                    header.calcCartNum();
                    $(this).parents(".shop-ul").find('.allm').html('￥' + (value*cart[index].price).toFixed(2));
                    _this.calcMoney ();
                });
                //减少按钮
                $("#cart-container").on("click",".qtyBtnL",function(){
                    let value = $(this).next().val();
                    value--;
                    $(this).next().val(value);
                    if(value < 1){
                        $(this).next().val(1);
                        $(this).css("background-color","#b4b4b4");
                        $(this).parents(".shop-ul").find('.allm').html(cart.price);
                    }
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id =$(this).attr("data-id");
                    let index = -1;
                    cart.some((shop,i) =>{
                        index = i;
                        return shop.id == id;
                    });
                    cart[index].num = value;
                    if(cart[index].num < 1){
                        cart[index].num = 1;
                        
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    header.calcCartNum();
                    $(this).parents(".shop-ul").find('.allm').html('￥'+ (value*cart[index].price).toFixed(2));
                    _this.calcMoney ();
                });
                
            }

            //删除商品
            delBtn(){
                let _this = this;
                $("#cart-container").on("click",".delBtn", function() {
                    if (confirm('确定要删除商品吗?')) {
                        let cart = localStorage.getItem('cart');
                        cart = JSON.parse(cart);
                        let id =$(this).attr("data-id");
                        let index = -1;
                        cart.some((shop,i) =>{
                            index = i;
                            return shop.id == id;
                        });
                        $(this).parents(".shop").remove();
                        cart.splice(index,1);
                        localStorage.setItem('cart',JSON.stringify(cart));
                        header.calcCartNum();  
                        _this.calcMoney();
                        _this.wholeCheck();
                    }
                })

            }

            //点击单选按钮
            click(){
                let _this = this;
                let cart =localStorage.getItem('cart');
                cart = JSON.parse(cart);
                $(".son-check").each(function(){
                    $(this).click(function(){
                        //console.log(cart);
                        if($(this).prop("checked")){
                            cart.forEach(function(data){
                                data.checked = true;
                            })
                        }else{
                            cart.forEach(function(data){
                                data.checked = false;
                            })
                        } 
                        _this.calcMoney();
                        _this.wholeCheck();
                    })
                })   
            }

            //全选按钮
            wholeCheck () {
                this.count = 0;
                $(".son-check").each((i,data) => {
                  if($(data).prop('checked')){
                    this.count++;
                  }
                })
                $('.son-check').length == this.count ? $('.whole-check').prop("checked",true) : $('.whole-check').prop("checked",false);
            }
        //     $('.wholi-check').click(function(){
        //         if($(this).prop('checked')){
        //            $('.son-check').prop('checked',true);
        //         }else{
        //            $('.son-check').prop('checked',false);
        //         }
        //    })

            //计算总价
            calcMoney (){
                let allmoney = 0;
                let sonCheckBtn = $(".son-check");
                sonCheckBtn.each(function(){
                        //console.log($(this).prop("checked"));
                        if($(this).prop("checked") == true){
                            let money = Number($(this).parents('.shop').find('.allm').html().substring(1));
                            allmoney += money;
                            //console.log($(this).parents().find('.allm').html().substring(1));
                        } 
                });
                $('#calcmoney').html('￥' + allmoney.toFixed(2));
            }
            
        }
        new Cart();
    })
})