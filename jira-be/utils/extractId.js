const extractId = (str)=>{
    var newStr = str.substring(1,str.length-1)
    newStr = newStr.replaceAll("'","")
    newStr = newStr.replaceAll(" ","")
    var arr = newStr.split(',')
    return arr
}
module.exports ={extractId}