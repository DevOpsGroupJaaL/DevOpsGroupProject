# Reviewer Note:
All Client IDs and URLs have been replaced with "XXXXXX" to anonymse the code :)

# App Related Commands

Make sure your terminal is in the directory of the app.

## Install packages

```
    npm install
```

## Run Local Server

```
    npm start
```

### Access Running App

The running server can be access here: [http://localhost:3000](http://localhost:3000)

# Getting Credentials for AWS SDK

To use functionality from the AWS SDK you need to add credentials to your local environemnt. The following steps are required:

1. Go to [your organisations login page]()
2. Click on `AWS Account` > `Root Acc Name` > ` Command line or programmatic access`
3. Go to the your respective OS at the top of the modal
4. Copy the values in `Set AWS environment variables` (if you click on them they should copy for you)
5. Paste the env vars in the terminal that you will use to run the npm server
6. Run the npm server

`NOTE:` These values expire every few hours, so keep the link hand to reapply the env vars every so often

# Manually Deploying to Elastic Beanstalk

Technically, you shoudnt need to deploy manually after CodeBuild and Pipelines are configured, but if you need it, follow these instructions:

1. Make sure you have Python3.7 installed and running
2. Follow [this guide](https://github.com/aws/aws-elastic-beanstalk-cli-setup)
3. Open a terminal in the directory of the app
4. Run `eb init`, choose the `eu-central` (5) region, and the correct EB
5. Run `eb deploy`
6. Go to [your website]() to verify the deployment was succesful
