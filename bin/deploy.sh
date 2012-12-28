#!/bin/bash
#
# Basic deployment script. For now the script assumes that your git project is
# in a folder relative to the home directory and has the same name as the
# deployment server you connect to.
#
# Set the DEPLOY_KEY environment variable if you want to specify an SSH key to
# connect with.

PROJECT='bemylove.nu'

REMOTE=$1
BRANCH=$2

git push $REMOTE $BRANCH
ssh -i $DEPLOY_KEY ec2-user@$PROJECT "cd $PROJECT; git pull $REMOTE $BRANCH;"
