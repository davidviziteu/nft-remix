
const express  = require('express');
const fetch  = require('node-fetch');

const app = express();
const port = 3000;

app.get('/search/:name', async (req, res)=>{
    try {
        //structura la raspunsul de la etherscan:
        /*
        [
            "Tokens (ERC 721)\t\t\t\t\t",
            "Bored Bunny (BUNNY)\t0x9372b371196751dd2f603729ae8d8014bbeb07f6\t0x9372b3711967...~https://www.boredbunny.io/~2~$0.00\t2\t1\tboredbunny_32.png",
            nume \t adresa \t prescurtare adresa + url homepage, care este intre ~, \t img url. daca ultimul camp nu 
                contine http:// inseamna ca vine https://etherscan.io/token/images/ + ce e in camp, altfel e full url
            ...
        ]
        */
        let retData = await fetch(`https://etherscan.io/searchHandler?t=t&term=${req.params.name}`)
        return res.status(200).end(await retData.text())
    } catch (error) {
        return res.status(300).end('[]')
    }

})

app.listen(port, () => {
    console.log(`localhost:${port}`);
});