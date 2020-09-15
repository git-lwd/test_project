const BaseService = require('./baseService')
const userModel = require('../model/userModel')

class UserService extends BaseService{
    constructor() {
        super(userModel)
        this.instance = userModel
    }
}

module.exports = new UserService()

// var uObj = new UserService();
// uObj.BaseCreate({
//     name: '小白白',
//     age: '15',
//     gender: 1,
//     birthday: '2000-10-10',
// })

// (async function () {
//     try {
//         var data = await uObj.BaseFindAndCountAll(['id', 'name', 'age'])
//         console.log(data)
//     } catch (error) {
//         console.log('err', error)
//     }
// })()

// (async function () {
//     try {
//         var data = await uObj.update({
//             name:'小白',
//             birthday:'1999-2-3'
//         },{
//             name:'小白白'
//         })
//         console.log(data)
//     } catch (error) {
//         console.log('err', error)
//     }
// })()

// (async function () {
//     try {
//         var data = await uObj.delete({
//             id: '5347d300-f703-11ea-8783-cdf1f11c9dd7'
//         })
//         console.log(data)
//     } catch (error) {
//         console.log('err', error)
//     }
// })()