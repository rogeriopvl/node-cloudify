# Cloudify - Share your files from the command line

## About

Cloudify is a command line tool that enables you to quickly share files from the command-line using your [CloudPT][0] account.

## Install

To install cloudify is as simple as:

    npm install -g cloudify

After you will have to run cloudify one first time, and it will create the configuration file for you. Then edit the file `~/.cloudifyrc` and complete with OAuth stuff (access token).

## Usage

Usage is pretty simple too:

    cloudify <path_to_file>

After running this command, you'll get the public link to the file that you can share throught IM or IRC or whatever! If you're on OSX, you will also get the public link automatically copied into your clipboard. How cool is that?

[0]: http://cloudpt.pt
