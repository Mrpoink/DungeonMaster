from pypdf import PdfReader

def read_pdf(filename):
    all_text = []
    max_length = 0
    shortest_length = 100000000
    try:
        reader = PdfReader(filename)

        for i, page in enumerate(reader.pages):

            text = page.extract_text()

            if text:
                text_on_page = text.split('.')

                for item in text_on_page:
                    if len(item) > max_length:
                        max_length = len(item)

                    if len(item) < shortest_length:
                        shortest_length = len(item)

                    all_text.append(item)

            else:
                print("Nothing on page")

    except Exception as e:
        print(f"Error reading pdf {e}")

    return all_text, max_length, shortest_length

