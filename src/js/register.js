require(['require.config'], () =>{
    require(['url','header','footer'], (url) =>{
        class Register{
            constructor () {
                this.inputUserName = $("#inputUserName");
                this.inputPassword = $("#inputPassword");
                this.btn = $("#btn");
                this.bindEvents();
            }

            bindEvents(){
                this.btn.on("click", () =>{
                    //取账号名和密码 ，提交后台
                    let username = this.inputUserName.val(),
                        password = this.inputPassword.val();
                    $.ajax({
                        url : url.phpBaseUrl + "user/register.php",
                        type: "post",
                        data:{username,password},
                        success:data =>{
                            if(data.res_code === 1) {
                                alert(data.res_message+", 即将跳转登录页");
                                location.href='login.html';
                              }
                        },
                        dataType : 'json'
                    })
                })
            }
        }
        new Register();
    })
})