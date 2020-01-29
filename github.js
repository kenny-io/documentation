//@ts-ignore
const fetch =  require("isomorphic-fetch");
var _ = require('lodash/fp/object');
const models = require('./models');
const Op = models.Sequelize.Op;

const contents = function(paths){
    return paths.forEach( async (element) => {
        if(element.url){
            let response  = await fetch(`https://api.github.com/repos/anjolabassey/test-docs/contents/v3${element.url}`);
            let data = await response.json();
            let path = data.path;
            let b64string = data.content;
            models.Algolia.create({
                path,
                content:b64string,
               
            }).then(data =>  {
                console.log(data);
            })
            
        }
        
    });
 
}

contents(
    [
        {
            "title": "Overview (php)",
            "identifier": "php",
            "url": "/php/transfers/overview.md"
          },
          {
            "title": "Quick Start (php)",
            "identifier": "php",
            "url": "/php/transfers/quickstart.md"
          },
          {
            "title": "Fetch Transfers (php)",
            "identifier": "php",
            "url": "/php/transfers/fetch_transfers.md"
          },
          {
            "title": "Bulk Transfers (php)",
            "identifier": "php",
            "url": "/php/transfers/bulktransfer.md"
          },
          {
            "title": "Confirm Transfer Status (php)",
            "identifier": "php",
            "url": "/php/transfers/confirm_transfer_status.md"
          },
          {
            "title": "Transfer Recipients (php)",
            "identifier": "php",
            "url": "/php/transfers/transfer_recipients.md"
          },
          {
            "title": "Transfer Features (php).",
            "identifier": "php",
            "url": "/php/transfers/transfer_features.md"
          },
          {
            "title": "Overview (node)",
            "identifier": "node",
            "url": "/node/transfers/overview.md"
          },
          {
            "title": "Quick Start (node)",
            "identifier": "node",
            "url": "/node/transfers/quickstart.md"
          },
          {
            "title": "Fetch Transfers (node)",
            "identifier": "node",
            "url": "/node/transfers/fetch_transfers.md"
          },
          {
            "title": "Bulk Transfers (node)",
            "identifier": "node",
            "url": "/node/transfers/bulktransfer.md"
          },
          {
            "title": "Confirm Transfer Status (node)",
            "identifier": "node",
            "url": "/node/transfers/confirm_transfer_status.md"
          },
          {
            "title": "Transfer Recipients (node)",
            "identifier": "node",
            "url": "/node/transfers/transfer_recipients.md"
          },
          {
            "title": "Transfer Features (node).",
            "identifier": "node",
            "url": "/node/transfers/transfer_features.md"
          },
          {
            "title": "Overview (python)",
            "identifier": "python",
            "url": "/python/transfers/overview.md"
          },
          {
            "title": "Quick Start (python)",
            "identifier": "python",
            "url": "/python/transfers/quickstart.md"
          },
          {
            "title": "Completing a transfer (python)",
            "identifier": "python",
            "url": "/python/transfers/singletransfer.md"
          },
          {
            "title": "Completing a transfer (python)",
            "identifier": "python",
            "url": "/python/transfers/bulktransfer.md"
          },
          {
            "title": "Going Live (python).",
            "identifier": "python",
            "url": "/python/transfers/goinglive.md"
          },
          {
            "title": "Overview (php)",
            "identifier": "php",
            "url": "/php/transfers/overview.md"
          },
    ] 
)
