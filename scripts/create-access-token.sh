#!/bin/bash

echo -n "Client Id: " && read -s CLIENT_ID && echo
echo -n "Client Secret: " && read -s CLIENT_SECRET && echo

curl -s --request POST \
--url 'https://bbp.epfl.ch/nexus/auth/realms/service-accounts/protocol/openid-connect/token' \
-H"Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET" | jq
