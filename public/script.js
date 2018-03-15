

new Vue({
    el: "#app",
    data: {

        select:'',
        total: 0,

        items: [],
        cart: [],
        search:''
    },
    methods: {
       
        addItem: function (index) {

            this.total += this.items[index].price;
            var item = this.items[index];

            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: 1
                })
            }

        },
        inc:function(item){
            item.qty++;
            this.total += item.price;
            
        },
        dec:function(item){
            item.qty--;
            this.total -= item.price;
            if(item.qty <=0){
                for(var i =0; i< this.cart.length; i++){
                    if(this.cart[i].id === item.id){
                        this.cart.splice(i,1);
                        break;
                    }
                    
                }
            }
            
        },
       
        onSubmit:function(){
           this.$http.get('/search/'.concat(this.search))
            .then(function(res){
                for(var i=0; i<res.data.length; i++){
                    var randNum = Math.floor(Math.random() * 20.99) + 2.99
                    res.data[i]['price'] = randNum;
                   
                }
                this.items = res.data;
             
                
            });
            
        },
        onLoad:function(){
            this.$http.get('/search/cats')
             .then(function(res){
                 for(var i=0; i<res.data.length; i++){
                     var randNum = Math.floor(Math.random() * 20.99) + 2.99
                     randNum = Number((randNum).toFixed(1));
                     res.data[i]['price'] = randNum;
                    
                 }
                 this.items = res.data;
              
                 
             });
             
         },
         

    },
    beforeMount(){
        this.onLoad()
     },
     
    filters:{
        toLower:function(value){
            return '$'.concat(value.toFixed(2));
        },
        toCapitalize:function(value){
            return value.toUpperCase();
        }
    }

});