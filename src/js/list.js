require(['require.config'], () =>{
    require(['url','template','header','footer'], (url,template) =>{
        class List{
            constructor() {
                this.getData();
            }
            //请求列表数据
            getData(){
                //发送ajax请求数据
                $.ajax({
                    url: url.rapBaseUrl + "list/get",
                    type: "get",
                    dataType: "json",
                    success: data =>{
                        if(data.res_code === 1) this.render(data.res_body.list);
                    }
                })
            }
            render(list){
                $("#shopItem").html(template('list-template',{list}));
                $("#list-shopItem").html(template('shoplist-template',{list}));
            
            }
        }
        new List();
    })
})