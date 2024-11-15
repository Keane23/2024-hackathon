import openai
import os
import base64
import json
from flask import Flask, jsonify

class journalist:
    
    def create_article(self, image):
    
        client = openai.OpenAI(api_key="sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA")

        # Function to encode the image
        def encode_image(image_path):
          with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

        image_path = image
        base64_image = encode_image(image_path)

        # Recieving openai's response
        response = client.chat.completions.create(
          model="gpt-4o-mini",
          messages=[
            {
              "role": "system",
              "content": "You are a Shakespeare looking for a scope to write a 1000 word article. Your audience is the high-class of the UK citizens at that time" +
                         "/nUse the following step-by-step instructions to respond to user inputs." +
                         "/nStep 1: The user will provide you an image input. You are to create a catchy title." +
                         "/nStep 2: You are to generate a random date with day, month, and year from the range 1584-1610." +
                         "/nStep 3: You are to write an article about the picture, having introduction, body, and conclusion. But don't mention the titles of the subsection, just use paragraphs." +
                         "/nStep 4: If you are unable to interpret the picture, identify the most relevant or main detail of the image and write the article. DO NOT SAY THAT YOU CANNOT INTERPRET, WRITE THE ARTICLE."
                         "/nStep 4: You are to include references to global issues or real life occurences near the specific date that you have chosen." +
                         "/nStep 5: You are to use the language of Shakespeare."
                         "/nStep 6: Output it in a json format, make the contents of the article in a list, each paragraph stored as a list item."
                         "/nStep 7: The json file must include title, date, author, article."
            },
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "Based on this image, could you write a 1000 word article about it?",
                },
                {
                  "type": "image_url",
                  "image_url": {
                    "url":  f"data:image/jpeg;base64,{base64_image}"
                  },
                },
              ],
            }
          ],
          response_format={"type": "json_object"}
        )

        # Removing all uneccessary text
        not_filtered = str(response.choices[0].message.content)
        not_filter = not_filtered.replace(" — ", ", ")
        no_filter = not_filter.replace("’", "'")
        ai_response = no_filter.replace("—", ", ")
        
        print(ai_response)
        file = open("article.json", "w")
        file.write(ai_response)
        
        return json.loads(ai_response)

app = Flask(__name__)

@app.route("/")
def generate_article():
    journalist_instance = journalist()
    article_content = journalist_instance.create_article(".\View.jpg")
    return article_content




if __name__ == "__main__":
    app.run(debug=True)


