define(['jquery','cookie'], $ => {
    function Header () {
      this.container = $("#header-container");
      this.load().then(() =>{
        this.search();
        this.isLogin();
        this.calcCartNum();
      });  
    } 
    // 对象合并
    $.extend(Header.prototype, {
      // ES6对象增强写法
      load () {
        // header.html加载到container里
        return new Promise(resolve =>{
          this.container.load('/html/module/header.html', () =>{
            resolve();
          })    
        })
      },
      //搜索框功能
      search(){
        let input = $("#search-input");
        input.on('keyup', function() {
          let keywords = $(this).val();
          //带上关键字请求jsonp接口
          $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+ keywords,data =>{
            console.log(data);
            
          })
        })
      },
      //登录后显示用户名
     isLogin(){
        this.loginBtn = $("#login-btn");
        this.registerBtn = $("#register-btn");
        this.afterLogin = $("#after-login");
        this.exit = $("#exit");
        this.nameSpan = $("#name");
        let username = $.cookie("username");
         if(username){
          this.loginBtn.hide();
          this.registerBtn.hide();
          this.afterLogin.show();
          this.exit.show();
          this.nameSpan.html(username);
         }
         this.exit.on("click",() =>{
           if(confirm("确定要退出吗？")){
            $.removeCookie("username",{path:'/'});
            this.loginBtn.show();
            this.registerBtn.show();
            this.afterLogin.hide();
            this.exit.hide();
            location.href = "/";
           }   
         })
     },
     calcCartNum (){
       let cart = localStorage.getItem('cart');
       
       let num = 0;
       if(cart){
         //计算总数量
         cart = JSON.parse(cart);
         //num放的是商品总数还是种类的数量
         //以总数量为例
         num =cart.reduce((n,shop) =>{
          n += shop.num;
          return n;
         },0)
       }
       $("#car-num").html(num);
     }

    })
    return new Header();
});