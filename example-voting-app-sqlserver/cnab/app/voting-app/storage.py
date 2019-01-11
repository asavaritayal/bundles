import os, uuid, sys, json
from azure.storage.blob import BlockBlobService, PublicAccess

account_name = os.getenv('ACC_NAME')
account_key = os.getenv('ACC_KEY')

def upload(data):
    try:

        # Create the BlockBlockService that is used to call the Blob service for the storage account
        block_blob_service = BlockBlobService(account_name, account_key)

        # Create a file in Documents to test the upload and download.
        local_path=os.path.expanduser("/app")
        local_file_name = str(uuid.uuid4()) + ".json"
        full_path_to_file =os.path.join(local_path, local_file_name)

        # Write text to the file.
        file = open(full_path_to_file,  'w')
    
        file.write(data)
        file.close()

        print("Temp file = " + full_path_to_file)
        print("\nUploading to Blob storage as blob" + local_file_name)

        container_name ='samples-workitems'

        # Upload the created file, use local_file_name for the blob name
        block_blob_service.create_blob_from_path(container_name, local_file_name, full_path_to_file)

    except Exception as e:
        print(e)

if __name__ == '__main__':
    upload(json.dumps({'voter_id': "", 'vote': ""}))