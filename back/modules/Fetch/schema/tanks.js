const tanks = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'None',
        loc: "Название",
        sort: true,
        editable: true,
        searchable: true,
    },
    COUNTRY: {
        type: 'String',
        require: false,
        default: 'None',
        loc: "Страна",
        sort: true,
        editable: true,
        searchable: true,
    },
    CLASS: {
        type: 'String',
        require: false,
        default: 'None',
        loc: "Классификация",
        sort: true,
        editable: true,
        searchable: true,
    }
}

export default tanks;