module.exports = cds.service.impl( async function(){

    const { POs, EmployeeSet } = this.entities;

    this.on('boost', async (req,res) => {
        try {
            //since its instance bound we will get the key
            const ID = req.params[0];
            console.log("Bro this is your key " + JSON.stringify(ID));
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            let test = await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 }
            }).where(ID);
            let reply = await tx.read(POs).where(ID);
            return reply;
           
        } catch (error) {
           console.log('ID not found', ID);
        }
    });

    this.on('getLargestOrder', async (req,res) => {
        try {
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);

            let reply = await tx.read(POs).orderBy({"GROSS_AMOUNT" : 'desc'}).limit(1);
            return reply;
           
        } catch (error) {
           console.log('ID not found', ID);
        }
    });

    this.on('tryUpdate', async (req,res) => {
        try {
            //since its instance bound we will get the key
            const ID = req.params[0];
            console.log("Bro this is your key " + JSON.stringify(ID));
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            let test = await tx.update(POs).with({
                TAX_AMOUNT: { '+=' : 50000 }
            }).where(ID);
            let reply = await tx.read(POs).where(ID);
            return reply;
           
        } catch (error) {
           console.log('ID not found', ID);
        }
    });

    this.on('tryDelete', async (req,res) => {
        try {
            //since its instance bound we will get the key
            const ID = req.params[0];
            console.log("deletion of your key " + JSON.stringify(ID));
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            let test = await tx.delete(POs).where(ID);
            let reply = await tx.read(POs).where(ID);
            return reply;
           
        } catch (error) {
           console.log('ID not found', ID);
        }
    });

    // calling insert using action
    this.on('myInsert', async (req,res) => {
        try {
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            const myData = {
                "CURRENCY_code": "EUR",
                "GROSS_AMOUNT": 1000.00,
                "NET_AMOUNT": 800.00,
                "TAX_AMOUNT": 200.00,
                "PO_ID": "9999999999",
                "LIFECYCLE_STATUS": "N",
                "OVERALL_STATUS": "P"
              }


            let test = await tx.insert(POs, myData);
            let reply = await tx.read(POs).where({PO_ID : 9999999999});
            return reply;
           
        } catch (error) {
           console.log('Failed to insert a data using function');
        }
    });

    // calling insert using function
    this.on('tryInsert', async (req,res) => {
        try {
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            const myData = {
                "CURRENCY_code": "EUR",
                "GROSS_AMOUNT": 1000.00,
                "NET_AMOUNT": 800.00,
                "TAX_AMOUNT": 200.00,
                "PO_ID": "9999999999",
                "LIFECYCLE_STATUS": "N",
                "OVERALL_STATUS": "P"
              }


            let test = await tx.insert(POs, myData);
            let reply = await tx.read(POs).where({PO_ID : 9999999999});
            return reply;
           
        } catch (error) {
           console.log('Failed to insert a data using function');
        }
    });

    // using action on EmployeeSet
    this.on('insertEmp', async (req,res) => {
        try {
            //start a transaction using cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = await cds.tx(req);
            const myData = req.data;
            let test = await tx.insert(EmployeeSet, myData);
            let reply = await tx.read(EmployeeSet).where({nameFirst : 'Sachin'});
            return reply;
           
        } catch (error) {
           console.log('Failed to insert a data for EmployeeSet using action');
        }
    });

    ///generic handler - BEFORE Employee data is UPDATEd check (validation)
    this.before(['CREATE','UPDATE'], EmployeeSet, (req, res) => {
        console.log("aa gaya " + req.data.salaryAmount);
        if(parseFloat(req.data.salaryAmount) >= 10000){
            req.error(500, "Salary must be less than 1 mn");
        }
    });

    this.on('loadInitials', async (req,res) => {
        try {
            return {
                OVERALL_STATUS : 'N'
            };
           
        } catch (error) {
            return "Error aa gaya " + error.toString();
        }
    });

    
})
