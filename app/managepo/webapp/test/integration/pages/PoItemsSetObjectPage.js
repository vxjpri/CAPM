sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'vxj02.po.managepo',
            componentId: 'PoItemsSetObjectPage',
            contextPath: '/POs/Items'
        },
        CustomPageDefinitions
    );
});