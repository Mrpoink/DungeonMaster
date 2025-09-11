import csv
import json

def csv_to_dict(filename):
    data_list = []
    
    with open(filename, 'r', newline='') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            dict = {}
            dict['input'] = row[:4]
            dict['output'] = row[4:]
            data_list.append(dict)

    return data_list

def dict_to_csv(data, filename):

    fieldNames = ['input', 'output']

    with open(filename, 'w', newline='', encoding='utf-8') as file:

        writer = csv.DictWriter(file, fieldnames=fieldNames)
        writer.writeheader()
        writer.writerows(data)

def to_json(data, output_file, w_or_r=None):

    if w_or_r is None: w_or_r = 'w'

    try:

        with open(output_file, w_or_r) as file:

            json.dump(data, file, indent=4)

    except Exception as e:

        print(e)


input= csv_to_dict('DungeonMaster/Datasets/Prompts.csv')
print(input)

to_json(input, 'Prompts.json')

#dict_to_csv(input, 'Prompts2.csv')
