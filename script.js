let open_response;


let chat =[
   {role:"user",content:"hi"} ,
   {role:"assistant",content:"hi, how can i help you today "} 
];

let felling = 2;
function chatUserAdd(felling , question){
    chat.push({role:"user",content: "my happiness from 0-10 "+ felling + ". my input is: " + question});
};

function chatAssistantAdd(res){
    chat.push({role: "assistant", content: res});
};
async function openAi_test(){
 let url="https://api.openai.com/v1/chat/completions"
 let part1 = "sk";
let part2 = "-5bpxzQt9pRMB76Vl0GXRT3B";
let part3 = "lbkFJJcrNpEhBx1KMnMPG7tjH";

let allParts = part1 + part2 + part3;
let data ={
    model:"gpt-3.5-turbo",
    messages: chat
}
try {
    const response = await fetch(url ,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization :`Bearer ${allParts}`
        },
        body :JSON.stringify(data)
    });
    if (response.ok)
    {
    const responseData = await response.json();
    
    const Message = responseData.choices[0].message.content;

    chatAssistantAdd(Message);
    const speech =new SpeechSynthesisUtterance(Message);
    speechSynthesis.speak(speech);
    return Message;
    }
}catch(error)
{
    console.log("Opps an error:"+error);
}
} 