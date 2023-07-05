require("dotenv").config();

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);
// Raw conversation between a software engineer and customer, as a paragraph. ChatGPT is expected to understand,interpret and generate test cases according to that.
const conversation = `Hi there! I'm in need of a calculator application that can perform basic mathematical operations. Do you think you can help me with that?
Absolutely! I'd be happy to assist you with that. Just to confirm, you're looking for a calculator that supports addition, subtraction, multiplication, and division, correct?
Yes, that's correct. I often find myself needing to perform these four operations quickly, so having them available in a calculator app would be really handy.
I understand. We can definitely implement those operations in the calculator application. Is there anything specific you'd like to see in terms of the user interface or any additional functionalities?
For now, a clean and user-friendly interface would be great. I would appreciate if the calculator also allows me to input decimal numbers and handles basic error handling for division by zero.
Noted. We'll ensure the calculator has a straightforward and intuitive user interface. Inputting decimal numbers and implementing error handling for division by zero are 
essential features that we'll include in the application.That sounds perfect! Additionally, it would be helpful if the calculator has a clear button to reset the input and a 
backspace button to correct any mistakes while typing. Excellent suggestions! We'll incorporate a clear button to reset the input and a backspace button for ease of use and to enhance the overall user experience.
Thank you so much for your assistance. I'm really looking forward to using this calculator. Let me know if you need any further clarification or if there's anything else you'd like to discuss.
You're welcome! I'm glad I could help. I have a clear understanding of your requirements, and I'll get to work on developing the calculator application with the specified features. 
If I have any additional questions during the implementation process, I'll reach out to you for clarification. Thank you for your input and cooperation!
Perfect! I appreciate your prompt response and attention to detail. I'm confident that the calculator will meet my needs. Good luck with the development, and I'll be eagerly waiting to try it out.`;

app.post("/method-one", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-16k", 
      prompt: `From the given conversation ${conversation}, write 10 software test cases. Test case requirements should be 
                fetched from the conversation. Only output 10 test cases, descriptions are not needed.`,
      temperature: 0, 
      top_p: 0.1, 
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    });

    console.log(response.data.choices[0].text);
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
    
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on running port: " + port);
});
