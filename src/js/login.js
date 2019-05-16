require(['require.config'], () =>{
    require(['url','header','footer','cookie'], (url) =>{
        class Login{
            constructor(){
                this.inputUserName = $("#inputUserName");
                this.inputPassword = $("#inputPassword");
                this.btn = $("#btn");
                this.checkbox = $("#checkbox");
                this.bindEvents();
            }

            bindEvents(){
                this.btn.on('click',()=>{
                    let username = this.inputUserName.val(),
                        password = this.inputPassword.val();

                    $.ajax({
                        url : url.phpBaseUrl + "user/login.php",
                        type: "post",
                        data:{username,password},
                        success:data =>{
                           if(data.res_code === 1){
                               this.loginSucc(username);
                           }else{
                               console.log("==0")
                           }
                        },
                        dataType:'json'
                    })
                })
            }

            loginSucc(username){
                let expires = this.checkbox.prop('checked') ? {expires:7} : {};
                expires = Object.assign({path:"/"},expires);
                $.cookie('username',username,expires);
                alert('登录成功。即将跳转首页');
                location.href = "/";
            }
        }
        new Login();
    })
})