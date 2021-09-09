const Payments = require('../Models/PaymentSchema');
const Users = require('../Models/UserSchema');
const Products = require('../Models/ProductSchema');


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            var mongoose = require('mongoose');

            let paymentsperUser = await Payments.find().lean().select('cart name email paymentID createdAt address _id')

            /*            
paymentsperUser =JSON.stringify(paymentsperUser)
            paymentsperUser =paymentsperUser.split("title");  */ 
          /*   paymentsperUser =JSON.stringify(paymentsperUser)
         paymentsperUser =paymentsperUser.replace(/[{}]+/g,"");
         paymentsperUser =paymentsperUser.replace('[','');
paymentsperUser =paymentsperUser =paymentsperUser.split("cart:"); */
let info =paymentsperUser.map(a=>({cart:a.cart,name:a.name,email:a.email, 
    paymentID:a.paymentID,createdAt:a.createdAt, _id:a._id, address:a.address}));

const sended = []
for (i in info){
    info[i].cart.filter(cart =>{
   /*  sended.push(info[i].name,cart) */
/*     console.log(info[i].name)
    console.log(cart) */
    if(cart.byuser === req.user.id){
        let identifier = mongoose.Types.ObjectId();

        cart.sendedto = info[i].name
        cart.sendedemial = info[i].email
        cart.paymentID = info[i].paymentID
        cart.time = info[i].createdAt
        cart.idPayment = info[i]._id
        cart.identifier = identifier
        cart.address = info[i].address
        /* sended.push(info[i].name,cart) */
        sended.push(cart)
        }
    })
}



/* paymentsperUser= paymentsperUser.map(a=>a.cart)
console.log(paymentsperUser)
 const obj = paymentsperUser.filter(obj=>{
    const cart=[]
    for(i in obj){
        if(obj[i].byuser === req.user.id){
            cart.push(obj[i])
        }
        
     } 

    return obj
}) */
 
        

        res.json(sended)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
           
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

         
            console.log("lo que se envio payment",req.body)

            const {val, paymentID, address} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart:val, paymentID, address
            })


            val.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })
        
            
            await newPayment.save()
            res.json({msg: "Payment Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl