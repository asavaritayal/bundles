import logging
import json
import azure.functions as func

def main(myblob: func.InputStream, doc: func.Out[func.Document]):

    vote_data = json.loads(myblob.read().decode('utf-8'))

    voter_id = vote_data.get('voter_id')
    vote = vote_data.get('vote')

    logging.info(f'Processing vote for {vote} by {voter_id}')

    doc.set(func.Document.from_json(json.dumps(vote_data)))