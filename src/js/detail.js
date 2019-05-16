require(['require.config'], () =>{
    require(['url','template','header','footer','zoom','fly'], (url,template,header) =>{
        class Detail{
            constructor(){
                this.init();
                this.addCart();
               
            }
            init(){
                //从url取到id,携带id请求详情数据，渲染详情页
                //console.log(location);
                let id = Number(location.search.slice(4));
                this.id = id;
                $.get(url.rapBaseUrl + "detail/get",{id},res =>{
                    if(res.res_code === 1){
                        
                        let {data} = res.res_body;

                        data.id = id;
                        //data = {...data,id};当接口变成真实的接口时，这句代码不需要了
                        //把当前数据存下来
                        this.data = data;   

                        this.render(data);
                        this.bind();
                    }
                })
            }
            render(data){
                $("#shop-detail").html(template("detail-template", { data }));
                this.zoom();
            }

            addCart (){
                //事件委托
                $("#shop-detail").on('click','#add-car', e => {

                    //完成抛物线加购物车动画
                    $(`<img src='${this.data.images[0]}' style='width:30px;height:30px'>`).fly({
                        start:{
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $("#car-num").offset().left,
                            top:$("#car-num").offset().top
                        },
                        onEnd: function () {
                            this.destroy();//销毁抛物体
                            header.calcCartNum();//调一次计算购物车数量的方法
                        }
                    });
                    //取到这条id相应的数据
                    //把this.data存在localstorage里
                   //先把cart取出来
                   let cart = localStorage.getItem('cart');
                   if(cart){
                    cart = JSON.parse(cart);
                       //已经存过购物车
                       //判断有没有当前商品
                       let index = -1;
                    if(cart.some((shop,i) => {
                        index = i;
                        return shop.id === this.data.id;
                    })){
                        cart[index].num += Number($(".qtyInput").val());
                    }else{
                        cart.push({...this.data,num : Number($(".qtyInput").val()),checked:false});
                    }

                   }else{
                       //购物车为空
                       cart = [{...this.data,num : Number($(".qtyInput").val()),checked:false}];
                   }
                   //重新存cart
                   localStorage.setItem('cart',JSON.stringify(cart));
                })
            }
            //放大镜插件
            zoom(){
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor:'pointer',
                    galleryActiveClass:'active',
                    borderSize:'1',
                    borderColor:'#888',
                    scrollZoom:true,
                    imageCrossfade:true
                });
            }

           bind(){
                $(".pdp-qty-box").on("click",".qtyBtnR",function(){
                    let value = Number($(this).prev().val());
                    value++;
                    $(this).prev().val(value);
                    if(value > 10){
                        $(this).prev().val(10);
                        $(this).css("background-color","#b4b4b4");
                    }
                    if(value > 1){
                        $(this).prevAll(".qtyBtnL").css("background-color","#00539c");
                    }
                    
                });
                $(".pdp-qty-box").on("click",".qtyBtnL",function(){
                    let value = Number($(this).next().val());
                    value--;
                    $(this).next().val(value);
                    if(value < 1){
                        $(this).next().val(1);
                        $(this).css("background-color","#b4b4b4");
                    }
                    if(value < 10){
                        $(this).nextAll(".qtyBtnR").css("background-color","#00539c");
                    }
                });
            }
        }
        new Detail();
    })
})