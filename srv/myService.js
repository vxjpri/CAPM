const cds = require('@sap/cds');
module.exports = function (srv) {
    srv.on('hello', (req, res) => {
        return 'Hello User: , Your name is ' + req.data.name;
    });

    srv.on('yourname', (req, res) => {
        return 'Hello your name : , ' + req.data.name;
    })

    const { employees } = cds.entities('anubhav.db.master');
    srv.on('READ', 'EmployeeSrv', async (req, res) => {
        //Get data from DB and loop and process, return
        let tx = await cds.tx(req);

        let allRecords = await tx.run(SELECT.from(employees).limit(5));
        // let allRecords = await tx.run(SELECT(1).from(employees)); ---> this will not work
        // let allRecords = await tx.read(employees).limit(5); // alternate option

        const updatedRecords = allRecords.map(record => ({
            ...record, //return other fields also
            salaryAmount: record.salaryAmount * 0.88 // 12% reduction
        }));

        return updatedRecords;
    });
}

