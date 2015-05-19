module.exports = {
    identity:'users',
    connection:'rosie',
    autoCreatedAt:true,
    autoUpdatedAt:true,
    autoPK:true,
    attributes:{
        slackid:{
            type:'string',
            unique:true
        },
        name:{
            type:'string'
        },
        real_name:{
            type:'string'
        },
        real_name_normalized:{
            type:'string'
        },
        email:{
            type:'string'
        },
        image:{
            type:'string'
        }
    }
};
