// export default (req, res) => {
//     res.status(200).json({ text: 'Hello' })
// }

for (var index = 0; index < 10; index++) {
    
    
    (function(){ //beginning of your current scope;
        //...
        var i = index
        setTimeout(() => { 
            
            console.log(i)
        }, 0)
       })();
}

