var test = require('ut-run/test');
var commonFunc = require('ut-test/lib/methods/commonFunc');
var ruleConstants = require('ut-test/lib/constants/rule').constants();
// var ruleMethods = require('ut-test/lib/methods/rule');
var coreJoiValidation = require('ut-test/lib/joiValidations/core');
var ruleJoiValidation = require('ut-test/lib/joiValidations/rule');
var userConstants = require('ut-test/lib/constants/user').constants();
var userMethods = require('ut-test/lib/methods/user');
const PRIORITY = ruleConstants.PRIORITY;
const OPERATIONSTARTDATE = ruleConstants.OPERATIONSTARTDATE;
const OPERATIONENDDATE = ruleConstants.OPERATIONENDDATE;
// var stdPolicy;
const CITY = 'city';
const REGION = 'region';
const COUNTRY = 'country';
const CHANNEL = 'channel';
const CURRENCY = 'currency';
const OPERATION = 'operation';
var cityId1, countryId1, regionId1, channelId1, currencyName1, currencyName2, operationId1;

module.exports = function(opt, cache) {
    test({
        type: 'integration',
        name: 'add rule',
        server: opt.server,
        serverConfig: opt.serverConfig,
        client: opt.client,
        clientConfig: opt.clientConfig,
        steps: function(test, bus, run) {
            return run(test, bus, [userMethods.login('login admin', userConstants.ADMINUSERNAME, userConstants.ADMINPASSWORD, userConstants.TIMEZONE),
                userMethods.getUser('get admin details', context => context['login admin']['identity.check'].actorId),
                // fetch std input policy
                // commonFunc.createStep('policy.policy.fetch', 'get std input by admin policy', (context) => {
                //     return {
                //         searchString: 'STD'
                //     };
                // }, (result, assert) => {
                //     var policy = result.policy.find(
                //         (singlePolicy) => singlePolicy.name.indexOf('STD_input') > -1
                //     );
                //     stdPolicy = (policy.policyId).toString();
                // }),
                // Fetch item type translations
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch counties', (context) => {
                    return {
                        itemTypeName: COUNTRY
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    countryId1 = result.itemTranslationFetch[0].itemNameId;
                }),
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch regions', (context) => {
                    return {
                        itemTypeName: REGION
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    regionId1 = result.itemTranslationFetch[0].itemNameId;
                }),
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch cities', (context) => {
                    return {
                        itemTypeName: CITY
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    cityId1 = result.itemTranslationFetch[0].itemNameId;
                }),
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch channels', (context) => {
                    return {
                        itemTypeName: CHANNEL
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    channelId1 = result.itemTranslationFetch[0].itemNameId;
                }),
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch currencies', (context) => {
                    return {
                        itemTypeName: CURRENCY
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    currencyName1 = result.itemTranslationFetch[0].itemName;
                    currencyName2 = result.itemTranslationFetch[1].itemName;
                }),
                commonFunc.createStep('core.itemTranslation.fetch', 'fetch operations', (context) => {
                    return {
                        itemTypeName: OPERATION
                    };
                }, (result, assert) => {
                    assert.equals(coreJoiValidation.validateFetchItemTranslation(result.itemTranslationFetch[0]).error, null, 'Return all details after listing itemName');
                    operationId1 = result.itemTranslationFetch[0].itemNameId;
                }),
                commonFunc.createStep('rule.rule.add', 'add rule with all parameters', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY, // mandatory
                            channelCountryId: countryId1,
                            channelRegionId: regionId1,
                            channelCityId: cityId1,
                            channelOrganizationId: context['get admin details'].memberOF[0].object,
                            // channelSupervisorId:
                            channelTag: '|ped|',
                            // channelRoleId:
                            channelId: channelId1, // channel type in the UI
                            operationId: operationId1,
                            operationTag: '|pos|',
                            operationStartDate: OPERATIONSTARTDATE,
                            operationEndDate: OPERATIONENDDATE,
                            sourceCountryId: countryId1,
                            sourceRegionId: regionId1,
                            sourceCityId: cityId1,
                            // sourceOrganizationId:
                            // sourceSupervisorId:
                            sourceTag: 'sourceTag',
                            // sourceId:
                            // sourceCardProductId:
                            // sourceAccountProductId:
                            // sourceAccountId:
                            destinationCountryId: countryId1,
                            destinationRegionId: regionId1,
                            destinationCityId: cityId1,
                            // destinationOrganizationId:
                            // destinationSupervisorId:
                            destinationTag: 'destinationTag'
                            // destinationId:
                            // destinationAccountProductId:
                            // destinationAccountId:
                        },
                        limit: [{
                            currency: currencyName1, // mandatory
                            minAmount: 10,
                            maxAmount: 200,
                            maxAmountDaily: 400,
                            maxCountDaily: 3,
                            maxAmountWeekly: 2000,
                            maxCountWeekly: 30,
                            maxAmountMonthly: 5000,
                            maxCountMonthly: 50
                        }],
                        split: {
                            data: {
                                rows: [{
                                    splitName: {
                                        name: 'test split', // mandatory
                                        tag: '|acquirer|atm|'
                                    },
                                    splitRange: [{
                                        isSourceAmount: false,
                                        maxValue: 90,
                                        minValue: 0,
                                        percent: 20,
                                        startAmount: 100, // mandatory
                                        startAmountCurrency: currencyName1, // mandatory,
                                        percentBase: 2 // TEST IT (operation value-percentBase)*percent
                                        // flatValue: 10!!! // TEST IT - in the documentation is mentioned flat amount but there is no such parameter in the response
                                    }],
                                    splitAssignment: [{
                                        credit: 'credit', // dropdown - where to fetch? TODO in standard is not a dropdown MANDATORY
                                        debit: 'debit', // dropdown - where to fetch? TODO in standard is not a dropdown MANDATORY
                                        description: 'split assignment description', // mandatory
                                        maxValue: 40,
                                        minValue: 0,
                                        percent: 4
                                    }]
                                }]
                            }
                        }
                    };
                }, (result, assert) => {
                    assert.equals(ruleJoiValidation.validateAddRule(result).error, null, 'Return all detals after add rule');
                }),
                commonFunc.createStep('rule.rule.add', 'successfully add rule with only priority', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY - 1
                        }
                    };
                }, (result, assert) => {
                    assert.equals(ruleJoiValidation.validateAddRule(result).error, null, 'Return all detals after add rule');
                    assert.equals(result.condition[0].priority, PRIORITY - 1, 'return correct priority');
                }),
                commonFunc.createStep('rule.rule.add', 'add rule with only mandatory fields for condition, split, limit', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY - 2 // mandatory
                        },
                        limit: [{
                            currency: currencyName1 // mandatory
                            // minAmount: 50, // ask if this should be mandatory as well (because of decision.fetch)
                            // maxAmount: 600 // ask if this should be mandatory as well (because of decision.fetch)
                        }],
                        split: {
                            data: {
                                rows: [{
                                    splitName: {
                                        name: 'test split' // mandatory
                                    },
                                    splitRange: [{
                                        startAmount: 100, // mandatory
                                        startAmountCurrency: currencyName1 // mandatory
                                    }],
                                    splitAssignment: [{
                                        credit: 'credit',
                                        debit: 'debit',
                                        description: 'split assignment description' // mandatory
                                    }]
                                }]
                            }
                        }
                    };
                }, (result, assert) => {
                    // console.log(result);
                    assert.equals(ruleJoiValidation.validateAddRule(result).error, null, 'Return all detals after add rule');
                    assert.equals(result.condition[0].priority, PRIORITY - 2, 'return correct priority');
                }),
                commonFunc.createStep('rule.rule.add', 'successfully add rule with two limits (different currencies)', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY - 3,
                            channelCountryId: countryId1,
                            channelRegionId: regionId1,
                            channelCityId: cityId1,
                            channelOrganizationId: context['get admin details'].memberOF[0].object
                        },
                        limit: [{
                            currency: currencyName1,
                            minAmount: 50,
                            maxAmount: 600
                        },
                        {
                            currency: currencyName2,
                            minAmount: 50,
                            maxAmount: 600
                        }]
                    };
                }, (result, assert) => {
                    assert.equals(ruleJoiValidation.validateAddRule(result).error, null, 'Return all detals after add rule');
                }),
                commonFunc.createStep('rule.rule.add', 'add rule with multiple split ranges, without splitAsignment', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY - 4, // mandatory
                            channelCountryId: countryId1,
                            channelRegionId: regionId1,
                            channelCityId: cityId1,
                            channelOrganizationId: context['get admin details'].memberOF[0].object
                        },
                        limit: [{
                            currency: currencyName1, // mandatory
                            minAmount: 50,
                            maxAmount: 600
                        }],
                        split: {
                            data: {
                                rows: [{
                                    splitName: {
                                        name: 'test split with multiple ranges', // mandatory
                                        tag: '|'
                                    },
                                    splitRange: [{
                                        maxValue: 10,
                                        minValue: 3,
                                        percent: 2,
                                        startAmount: 0, // mandatory
                                        startAmountCurrency: currencyName1 // mandatory,
                                    },
                                    {
                                        maxValue: 20,
                                        minValue: 10,
                                        percent: 5,
                                        startAmount: 100, // mandatory
                                        startAmountCurrency: currencyName1 // mandatory,
                                    },
                                    {
                                        maxValue: 30,
                                        minValue: 15,
                                        percent: 5,
                                        startAmount: 500, // mandatory
                                        startAmountCurrency: currencyName1 // mandatory,
                                    }]
                                }]
                            }
                        }
                    };
                }, (result, assert) => {
                    assert.equals(ruleJoiValidation.validateAddRule(result).error, null, 'Return all detals after add rule');
                }),
                // NEGATIVE
                commonFunc.createStep('rule.rule.add', 'unsuccessfully add rule with 2 limits with the same currency', (context) => {
                    return {
                        condition: {
                            priority: PRIORITY - 5
                        },
                        limit: [{
                            currency: currencyName1,
                            minAmount: 40,
                            maxAmount: 700
                        },
                        {
                            currency: currencyName1,
                            minAmount: 50,
                            maxAmount: 600
                        }]
                    };
                }, null,
                (error, assert) => {
                    assert.equals(error.type, 'PortSQL', 'Cannot insert limits with the same currency');
                }),
                commonFunc.createStep('rule.decision.fetch', 'fetch decision rule', (context) => {
                    return {
                        amount: 200,
                        currency: currencyName1
                    };
                }, (result, assert) => {
                    // console.log(result);
                })
            ]);
        }
    }, cache);
};
