# Cloudify - Share your files from the command line

## About

Cloudify is a command line tool that enables you to quickly share files from the command-line using your [CloudPT][0] account.

## Install

To install cloudify is as simple as:

    npm install -g cloudify

When you first run `cloudify`, the CloudPT OAuth setup will take place. Just follow the instructions to enable access to your account.

After the setup your OAuth tokens will be stored in a file at `~/.cloudifyrc`.

## Usage

Usage is pretty simple too:

    cloudify [options] <path_to_file>

    options:
        -d    get the final link to the file instead of the CloudPT preview link
        -n | --name (optional) save the file with a custom filename

After running this command, you'll get the public link to the file that you can share throught IM or IRC or whatever! If you're on OSX, you will also get the public link automatically copied into your clipboard. How cool is that?

[0]: http://cloudpt.pt
