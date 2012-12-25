#!/bin/bash

SERVER=$1
BRANCH=$2
git push $SERVER $BRANCH
ssh -i ./.ssh/c2o_aws.pem ec2-user@$SERVER "cd $SERVER; git pull;"
