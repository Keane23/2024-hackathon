import openai
import os
import base64
import json
from dotenv import load_dotenv

class journalist:
    
    def create_article(self, image):
      
        load_dotenv(".env")
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        
        base64_image = image

        # Recieving openai's response
        response = client.chat.completions.create(
          model="gpt-4o",
          messages=[
            {
              "role": "system",
              "content": "You are Shakespeare working for a newspaper publishing company looking for a scope to write a 500 word article. Your audience is everyone, because this article is for the public." +
                         "/nUse the following step-by-step instructions to respond to user inputs." +
                         "/nStep 1: The user will provide you an image input. You are to carefully analyze the main subject and the scene (including location, event type, and time of day)." +
                         "/nStep 2: Optionally, you are to identify specific logos or symbols that may appear in the picture. If you could, then identify it in your article."
                         "/nStep 3: Create a caption for the photo." +
                         "/nStep 4: You are to generate a random date with day, month, and year from the range 1584-1610." +
                         "/nStep 5: You are to write an article about the picture, having introduction, body, and conclusion. But don't mention the titles of the subsection, just use paragraphs." +
                         "/nStep 6: In the context of the scene and main subject, assume a scenario that has happened and explain it as a news article."
                         "/nStep 6: Based on the picture, identify the tone. Is it 'Happy', 'Sad', 'Angry', 'Fearful', or 'Disgust'? Select only one tone from the list described. DO NOT SAY A DIFFERENT TONE THEN I HAVE LISTED."
                         "/nStep 7: If you are unable to interpret the picture, identify the most relevant or main detail of the image and write the article. DO NOT SAY THAT YOU CANNOT INTERPRET, WRITE THE ARTICLE." +
                         "/nStep 8: You are to include references to the weather, objects, scenery, main subject, logos, symbols, or even famous buildings in the picture." +
                         "/nStep 9: You are to use the language of Shakespeare but the formality, style, and layout of an article written by a newspaper writer. BE MORE INFORMATIVE THEN DESCRIPTIVE, the information may be assumed."
                         "/nStep 10: Output it in a json format, make the contents of the article in a list, each paragraph stored as a list item."
                         "/nStep 11: The json file must include title, date, author, article, tone, and caption."
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
    
        file = open("article.json", "w")
        file.write(ai_response)
        
        return json.loads(ai_response)


def generate_article(b64):
    journalist_instance = journalist()
    article_content = journalist_instance.create_article(b64)
    return article_content

