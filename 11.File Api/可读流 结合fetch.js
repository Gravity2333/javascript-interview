fetch('http://localhost:3000/echo').then(res=>{
    return res.body.getReader().read()
   
}).then(res=>{
     console.log(res)
})