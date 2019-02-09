const yamlController = {};
const fs = require('fs');
const { spawn } = require('child_process');

yamlController.addPod = (req, res, next) => {

  console.log("req.body.name: ", req.body.name);
  const podYaml = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
      name: "myapp-NEWPOD",
      labels: {
        app: "myapp"
      }
    },
    spec: {
      containers: [
        {
          name: "myapp-container",
          image: "carolynharrold/dreams-repo",
          imagePullPolicy: "Always",
          env: [
            {
              name: "DEMO_GREETING",
              value: "Hello from the environment"
            }
          ],
          command: [
            "sh",
            "-c",
            "echo Hello Kubernetes! && sleep 3600"
          ]
        }
      ]
    }
  }
  

console.log("podYaml pre stringify: ", podYaml)

let stringifiedYaml = JSON.stringify(podYaml);
console.log("podYaml post stringify: ", stringifiedYaml)


fs.writeFile(`./yamlAssets/pods/${req.body.name}.json`, stringifiedYaml, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("You made a pod Yaml!!!!");
});
next();
};

yamlController.podCreator = (req, res, next) => {
  const child = spawn('kubectl', ['apply', '-f', `./yamlAssets/pods/${req.body.name}.json`]);
  console.log("podCreator");
  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  })
  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  })
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  next();
  }

//apiVersion: v1
// kind: Pod
// metadata:
//   name: myapp-pod
//   labels:
//     app: myapp
// spec:
//   containers:
//   - name: myapp-container
//     image: busybox
//     command: ['sh', '-c', 'echo Hello Kubernetes! && sleep 3600']


module.exports = yamlController;
