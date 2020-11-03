const Group = require('../models/Group');
async function getGroups(){
    //Groups from DB
    var groups = await Group.find()
    return groups
}

function mockedGroups(){
    var mockedGroups = []
    
    var mockedGroup1 = {name: "grupo1", memberCount:"50", category: "ROL", users:[], createdAt: '27/10/2020'}
    var mockedGroup2 = {name: "grupo2", memberCount:"40", category: "ROL", users:[], createdAt: '27/10/2020'}
    var mockedGroup3 = {name: "grupo3", memberCount:"20", category: "LAO", users:[], createdAt: '27/10/2020'}
    var mockedGroup4 = {name: "grupo4", memberCount:"10", category: "ROL", users:[], createdAt: '27/10/2020'}
    var mockedGroup5 = {name: "grupo5", memberCount:"60", category: "LAO", users:[], createdAt: '27/10/2020'}
    var mockedGroup6 = {name: "grupo6", memberCount:"10", category: "ROL", users:[], createdAt: '27/10/2020'}
    
    mockedGroups.push(mockedGroup1)
    mockedGroups.push(mockedGroup2)
    mockedGroups.push(mockedGroup3)
    mockedGroups.push(mockedGroup4)
    mockedGroups.push(mockedGroup5)
    mockedGroups.push(mockedGroup6)

    return mockedGroups
}


module.exports = {
    getGroups,
    mockedGroups
}
