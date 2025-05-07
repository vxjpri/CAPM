sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'vxj02.po.managepo',
            componentId: 'POsList',
            contextPath: '/POs'
        },
        CustomPageDefinitions
    );
});