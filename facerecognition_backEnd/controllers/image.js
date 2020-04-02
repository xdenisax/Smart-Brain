const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey:'f7a8639bed764de6842c42d1ea7f8c02'
});

const handleAPICall = (req,res)=> {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=> {
        res.json(data)
    })
    .catch(err=>res.status(400).json("unable to work with api"));
}


const imageGet = (req,res,database)=>{
    const {id} = req.body;
    database('users')
    .where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("unable to get entries."));
}
module.exports={
    imageGet,
    handleAPICall
}