//import React ,{useState} from 'react';
// import { DeleteObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from "./libs/s3Client.js"
const AWS = require('aws-sdk');

const S3_BUCKET ='nodonimages';
const REGION ='ap-south-1';


AWS.config.update({
    accessKeyId: 'AKIA46OLWFPRBDJDYGA3',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

exports.upload = async (req,res) => {

  const buf = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64');

        const params = {
            ACL: 'public-read',
            Body: buf,
            Bucket: S3_BUCKET,
            Key: req.body.key,
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                console.log(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err,data) => {
                if (err) {console.log(err);}
                else {console.log(data)};
            })
        res.json({
            public_id: params.Key,
            url: `https://${S3_BUCKET}.s3.ap-south-1.amazonaws.com/${params.Key}`,
        });
        
}

exports.remove = async (req,res) => {
        try {
          const data = await myBucket.deleteObject({ Bucket: "nodonimages", Key: req.body.key }).on('httpUploadProgress', (evt) => {
            console.log(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err,data) => {
            if (err) {console.log(err);}
            else {console.log(data)};
        });
          console.log("Success. Object deleted.", data);
        } catch (err) {
          console.log("Error", err);
        }
        res.send("ok");
}