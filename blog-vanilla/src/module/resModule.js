// 基类
class BaseModule{
    constructor(data,message){
        if(typeof data === 'string'){//没有接收到数据
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}
//成功数据模型
class SuccessModule extends BaseModule{
    constructor(data,message){
        super(data,message)
        this.errorno = 0//是否出错的标识
    }
}
//失败数据模型
class ErrorModule extends BaseModule{
    constructor(data,message){
        super(data,message)
        this.errorno = -1
    }
}

module.exports = {
    SuccessModule,
    ErrorModule
}