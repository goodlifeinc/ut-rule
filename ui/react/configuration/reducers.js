import * as actionTypes from './actionTypes';
import immutable from 'immutable';

const defaultUiState = {
    nomenclatures: {
        itemName: [],
        itemCode: [],
        agentRole: [],
        accountAlias: [],
        organization: [],
        role: []
    },
    main: {
        grid: {
            columns: {
                priority: {
                    visible: true,
                    sortable: false,
                    title: 'Priority'
                },
                channel: {
                    visible: true,
                    sortable: false,
                    title: 'Channel'
                },
                operation: {
                    visible: true,
                    sortable: false,
                    title: 'Operation'
                },
                source: {
                    visible: true,
                    sortable: false,
                    title: 'Source'
                },
                destination: {
                    visible: true,
                    sortable: false,
                    title: 'Destination'
                },
                limit: {
                    visible: true,
                    sortable: false,
                    title: 'Limit'
                },
                split: {
                    visible: true,
                    sortable: false,
                    title: 'Split'
                },
                expansion: {
                    visible: true,
                    sortable: false,
                    title: 'Expansion'
                }
            }
        }
    },
    dialog: {
        sections: {
            channel: {
                visible: true,
                title: 'Channel',
                fields: {
                    channel: {
                        visible: false,
                        title: 'Type'
                    },
                    country: {
                        visible: true,
                        title: 'Country'
                    },
                    region: {
                        visible: true,
                        title: 'Region'
                    },
                    city: {
                        visible: true,
                        title: 'City'
                    },
                    organization: {
                        visible: true,
                        title: 'Business Unit'
                    },
                    supervisor: {
                        visible: true,
                        title: 'Supervisor'
                    },
                    properties: {
                        visible: true,
                        title: 'Properties'
                    },
                    role: {
                        visible: true,
                        title: 'Role'
                    }
                }
            },
            operation: {
                visible: true,
                title: 'Operation',
                fields: {
                    tag: {
                        visible: true,
                        title: 'Tag'
                    },
                    operationStartDate: {
                        visible: true,
                        title: 'Start Date'
                    },
                    operationEndDate: {
                        visible: true,
                        title: 'End Date'
                    },
                    operationId: {
                        visible: true,
                        title: 'Operation'
                    },
                    properties: {
                        visible: true,
                        title: 'Properties'
                    }
                }
            },
            source: {
                visible: true,
                title: 'Source',
                fields: {
                    country: {
                        visible: true,
                        title: 'Country'
                    },
                    region: {
                        visible: true,
                        title: 'Region'
                    },
                    city: {
                        visible: true,
                        title: 'City'
                    },
                    role: {
                        visible: true,
                        title: 'Role'
                    },
                    organization: {
                        visible: true,
                        title: 'Organization'
                    },
                    supervisor: {
                        visible: true,
                        title: 'Supervisor'
                    },
                    tag: {
                        visible: true,
                        title: 'Tag'
                    },
                    cardProduct: {
                        visible: true,
                        title: 'Product'
                    },
                    accountProduct: {
                        visible: true,
                        mutli: false,
                        title: 'Account Product'
                    },
                    account: {
                        visible: true,
                        title: 'Account'
                    },
                    properties: {
                        visible: true,
                        title: 'Properties'
                    }
                }
            },
            destination: {
                visible: true,
                title: 'Destination',
                fields: {
                    country: {
                        visible: true,
                        title: 'Country'
                    },
                    region: {
                        visible: true,
                        title: 'Region'
                    },
                    city: {
                        visible: true,
                        title: 'City'
                    },
                    organization: {
                        visible: true,
                        title: 'Organization'
                    },
                    supervisor: {
                        visible: true,
                        title: 'Supervisor'
                    },
                    tag: {
                        visible: true,
                        title: 'Tag'
                    },
                    cardProduct: {
                        visible: true,
                        title: 'Product'
                    },
                    accountProduct: {
                        visible: true,
                        mutli: false,
                        title: 'Account Product'
                    },
                    account: {
                        visible: true,
                        title: 'Account'
                    },
                    role: {
                        visible: true,
                        title: 'Role'
                    },
                    properties: {
                        visible: true,
                        title: 'Properties'
                    }
                }
            },
            limit: {
                visible: true,
                title: 'Limit'
            },
            split: {
                visible: true,
                title: 'Split for fees and commissions',
                assignmentFields: {
                    description: {
                        visible: true,
                        title: 'Description'
                    },
                    debit: {
                        visible: true,
                        title: 'Debit'
                    },
                    debitAlias: {
                        visible: false,
                        title: 'Debit'
                    },
                    credit: {
                        visible: true,
                        title: 'Credit'
                    },
                    creditAlias: {
                        visible: false,
                        title: 'Credit'
                    },
                    percent: {
                        visible: true,
                        title: '%'
                    },
                    minValue: {
                        visible: true,
                        title: 'Min Amount'
                    },
                    maxValue: {
                        visible: true,
                        title: 'Max Amount'
                    }
                }
            },
            summary: {
                visible: true,
                title: 'Summary'
            }
        }
    }
};

const defaultStateImmutable = immutable.fromJS(defaultUiState);

export function uiConfig(state = defaultStateImmutable, action) {
    switch (action.type) {
        case actionTypes.SET_RULE_CONFIG:
            if (action.config) {
                let passedConfigAsImmutable = immutable.fromJS(action.config);
                let newConfigState = state.mergeDeep(passedConfigAsImmutable);
                return newConfigState;
            }
    }

    return state;
}

export default { uiConfig };
