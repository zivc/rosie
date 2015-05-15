module.exports = {
    identity:'chat',
    connection:'rosie',
    autoCreatedAt:true,
    autoUpdatedAt:true,
    autoPK:true,
    attributes:{
        from:{
            type:'string'
        },
        to:{
            type:'string'
        },
        message:{
            type:'string'
        }
    }
};
