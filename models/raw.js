module.exports = {
    identity:'raw',
    connection:'rosie',
    autoCreatedAt:true,
    autoUpdatedAt:true,
    autoPK:true,
    migrate:'alter',
    attributes:{
        prefix:{
            type:'string',
            size:1024
        },
        nick:{
            type:'string'
        },
        user:{
            type:'string'
        },
        host:{
            type:'string'
        },
        command:{
            type:'string'
        },
        rawCommand:{
            type:'string'
        },
        commandType:{
            type:'string'
        },
        args:{
            type:'json'
        }
    }
};
