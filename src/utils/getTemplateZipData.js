import JSZip from 'jszip'
const getZipData = (blobData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    let result = {
      blobArr: [],
      data: {},
    }
    let zipObj = new JSZip()
    let zipFile = await zipObj.loadAsync(blobData)
    for (let key in zipFile.files) {
      let tempName = zipFile.files[key].name
      if (tempName.indexOf('.png') != -1 || tempName.indexOf('.jpg') != -1) {
        console.log('有用到的图层文件和字体文件', zipFile.files[key])
        //@ts-ignore
        let fileBlob = await zipFile.file(tempName).async('blob') //传入解压文件命名和解压缩后想得到的格式。
        //@ts-ignore
        result.blobArr.push({ name: tempName, blob: fileBlob })
      }
      //json文件转为字符串
      if (tempName.indexOf('.json') != -1) {
        console.log('有用到的json文件', zipFile.files[key])
        //@ts-ignore
        let jsonString = await zipFile.file(tempName).async('string')
        result.data = JSON.parse(jsonString)
        //后面还发现貌似有asnyc('json')方法直接得到json格式，可能就不用走以上两步了
      }
    }
    console.log('解压后得到的数据---------------', result)
    resolve(result)
  })
}

const urlToBlob = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => {
        return response.blob() //解析成blob对象
      })
      .then((blobData) => {
        console.log('blob-----------------', blobData)
        resolve(blobData)
      })
  })
}

export const getTemplateZipData = (url) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    let blobData = await urlToBlob(url)
    let templateData = await getZipData(blobData)
    resolve(templateData)
  })
}
