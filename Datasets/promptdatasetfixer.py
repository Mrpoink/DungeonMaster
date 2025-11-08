import csv 

def read_csv(filename):
    
    data_list = []
    
    with open(filename, 'r', newline='\n') as file:
        
        csv_reader = csv.reader(file)

        
        for row in csv_reader:
            new_row = row[0].split('\n')
            if len(new_row) == 2:
                print(new_row[1])
                data_list.append(new_row[1])
            
    return data_list

def read_csv_default(filename):
    data_list = []

    with open(filename, 'r', newline="") as file:

        csv_reader = csv.reader(file)

        for row in csv_reader:


            data_list.append(row)

    return data_list


def compare_two(prompt_list, output_list):

    i =0

    finished_list = []

    for line in prompt_list:
        x = 0

        for outcome in output_list:

            if x < 1 and outcome not in finished_list:
                if line in outcome:
                    i+= 1
                    x+=1
                    print(outcome)
                    finished_list.append(outcome)
    print(i)


def returned_output_to_csv(output_list, filename):

    with open(filename, 'w', newline='') as file:
        csv_writer = csv.writer(file)

        for output in output_list:
            csv_writer.writerow([output])


data_list0 = read_csv('Datasets\Output_Slice_0.csv')
data_list1 = read_csv('Datasets\Output_Slice_1.csv')
data_list2 = read_csv('Datasets\Output_Slice_2.csv')
data_list3 = read_csv('Datasets\Output_Slice_3.csv')

data_list = data_list0 + data_list1 + data_list2 + data_list3

prompt_list = read_csv_default('Datasets\Prompts.csv')

compare_two(prompt_list, data_list)