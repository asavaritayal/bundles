#!/bin/bash

# Required to run: 
#   - az cli
#   - func cli (Azure Functions Core Tools)
#   - $APPNAME
#   - Azure service principal creds: $APPID, $PASSWORD, $TEANANT_ID

# Function app and storage account names must be unique.
functionAppName=$APPNAME
storageName=storage$APPNAME
resourceGroupName=resourcegroup$APPNAME
location=eastus

# Login to Azure
# az login --service-principal --username "$APP_ID" --password "$PASSWORD" --tenant "$TENANT_ID" 

# Create a resource group.
az group create --name $resourceGroupName --location $location

# Create an Azure storage account in the resource group.
az storage account create \
  --name $storageName \
  --location $location \
  --resource-group $resourceGroupName \
  --sku Standard_LRS

# Create a serverless function app in the resource group.
az functionapp create \
    --resource-group $resourceGroupName \
    --consumption-plan-location $location \
    --os-type Linux \
    --name $functionAppName \
    --storage-account  $storageName \
    --runtime python

# Deploy the function app project
func azure functionapp publish $functionAppName