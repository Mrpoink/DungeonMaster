import csv
import json
import sys

def csv_reader(file_name):

    overall_list = []

    with open(file_name, 'r', encoding='utf-8') as file:

        reader = csv.reader(file)

        headers = next(reader)

        print(f"Headers: {headers}")

        for row in reader:
            
            dict_obj = {}

            i = 0
            
            for item in row:

                dict_obj[headers[i]] = item

                overall_list.append(dict_obj)

                i+=1

    return overall_list


        
def to_json(data, output_file, w_or_r=None):

    if w_or_r is None: w_or_r = 'w'

    try:

        with open(output_file, w_or_r) as file:

            json.dump(data, file, indent=4)

    except Exception as e:

        print(e)

data = csv_reader('DungeonMaster/Datasets/Prompts.csv')