require("dotenv").config()

const AWS = require('aws-sdk')
const crypto = require("crypto")
const fs = require('fs')


const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET
})

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
})



const upload = async (req, res) => {
  // s3.listBuckets({}, (err, data) => {
  //     if(err) throw err
  //     console.log(data);
  // })


  // const params = {
  //      Bucket: process.env.BUCKET

  //  }

  //  s3.listObjectsV2(params, (err, data) => {
  //      if (err) throw err
  //      console.log(data);
  //  })



  // const setParams = {
  //   Bucket: process.env.BUCKET,
  //   Key: 'prueba.txt'

  // }
  // s3.getObject(setParams, (err, data) => {
  //   if (err) throw err
  //   console.log(data);

  //   fs.writeFile('prueba.txt', data.Body, 'binary', (err) => {
  //     if (err) throw err
  //     console.log('Archivo descargado');
  //   }) 

  // })




  // fs.readFile('tc_davivienda_example2.csv', (err, data) => {
  //     if (err) throw err
  //     console.log(data);
  //     const params = {
  //         Bucket: process.env.BUCKET,
  //         Key: 'tc_davivienda_example2.csv',
  //         Body: data
  //     }

  //     s3.putObject(params, (err, data) => {
  //         if (err) throw err
  //         console.log('Archivo subido', data);

  //     })
  // })


  // const encryptedFile = fs.readFileSync("helloWorld.txt", {
  //   encoding: "utf-8",
  // });
  // const publicKey = Buffer.from(fs.readFileSync('public_key.pem', { encoding: 'utf-8' }))
  // const encryptedData = crypto.publicEncrypt(
  //   {
  //     key: publicKey,
  //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //     oaepHash: 'sha256',
  //   },
  //   Buffer.from(encryptedFile)
  // )
  // fs.writeFileSync('encrypted_helloWorld.txt', encryptedData.toString('base64'), { encoding: 'utf-8' })

  const encryptedData = fs.readFileSync('encrypted_helloWorld.txt', { encoding: 'utf-8' })
  const privateKey = fs.readFileSync('private_key.pem', { encoding: 'utf-8' })
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedData, 'base64'),
  )

  fs.writeFileSync('decrypted_helloWorld.txt', decryptedData.toString('utf-8'), { encoding: 'utf-8' })



}

const main = async (event) => {
  return upload()
}


exports.handler = main 
