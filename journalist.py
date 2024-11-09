import openai
import os
import base64

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

image_path = "Cats.jpg"
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
                 "/nStep 2: You are to generate a random date from the range 1584-1610." +
                 "/nStep 3: You are to write an article about the picture, having introduction, body, and conclusion." +
                 "/nStep 4: You are to include references to global issues or real life occurences near the specific date that you have chosen." +
                 "/nStep 5: You are to use the language of Shakespeare."
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
)

# Removing all uneccessary text
ai_response = str(response.choices[0])
old = ai_response.replace("Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='", "")
new = old.replace("', refusal=None, role='assistant', audio=None, function_call=None, tool_calls=None))", "")

file = open("article.txt", "w")
file.write(new)

file.close()
