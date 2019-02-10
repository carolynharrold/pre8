// Load the SDK and UUID
const EKS = require('aws-sdk/clients/eks');
const IAM = require('aws-sdk/clients/iam');
const policyDoc = require('../assets/Test-Role-Trust-Policy.json');

const uuid = require('uuid');

const iam = new IAM()
const eks = new EKS();

const sdkController = {};

//cloud formation

//CREATE A IAM ROLE FOR EKS
sdkController.createIAMRole = (req, res, next) => {
  console.log(req.body);

  //data coming from form
  let assumeRolePolicyDocument = JSON.stringify(policyDoc);
  console.log("assumeRolePolicyDocument: ", assumeRolePolicyDocument);
  let roleName = req.body.roleName;
  let description = req.body.description;
  //let permissionsBoundary = req.body.permissionsBoundary;
  //let key = req.body.key;
  //let value = req.body.value;
    
  //data we want to capture from AWS response once user is created
  let roleID;
  let createDate;
  let arn;

  // TODO: Verify that we need all of these options, like MaxSessionDuration, Permission Boundary, etc.
    
  const iamParams = {
    AssumeRolePolicyDocument: assumeRolePolicyDocument,
    RoleName: roleName,
    Description: description,
    Path: "/", 
    // MaxSessionDuration: 100,
    // PermissionsBoundary: permissionsBoundary,
    // Tags: [
    //   {
    //     Key: key,
    //     Value: value
    //   }
    // ]
  };
    
  iam.createRole(iamParams, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else { 
      console.log(data) 
      roleID = data.Role.RoleId;
      createDate = data.Role.RoleId; 
      arn = data.Role.Arn;
      next();
    };           
  })
  
}





//SET ROLE POLICY

//CLUSTER INSTRUCTIONS
// var params = {
//   version: "1.10", 
//   name: "prod", 
//   clientRequestToken: "1d2129a1-3d38-460a-9756-e5b91fddb951", 
//   resourcesVpcConfig: {
//    securityGroupIds: [
//       "sg-6979fe18"
//    ], 
//    subnetIds: [
//       "subnet-6782e71e", 
//       "subnet-e7e761ac"
//    ]
//   }, 
//   roleArn: "arn:aws:iam::012345678910:role/eks-service-role-AWSServiceRoleForAmazonEKS-J7ONKE3BQ4PI"
//  };
//  eks.createCluster(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
//    /*
//    data = {
     
//    }
//    */




//  });










// // Create unique bucket name
// const bucketName = 'node-sdk-sample-' + uuid.v4();
// // Create name for uploaded object key
// const keyName = 'hello_world.txt';

// // Create a promise on S3 service object
// const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// // Handle promise fulfilled/rejected states
// bucketPromise.then(
//   function(data) {
//     // Create params for putObject call
//     let objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//     // Create object upload promise
//     let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//     uploadPromise.then(
//       function(data) {
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//       });
// }).catch(
//   function(err) {
//     console.error(err, err.stack);
// });


module.exports = sdkController;
