var userInput = document.getElementById("userInp");

var messages = [];

var regPattern = /<think>(.*?)<\/think>/i;
console.log("Hi I am Happi ... !!");


var url = "http://localhost:11434";

const chatBox = document.getElementById("messages");

const models=[];

const modelSelect = document.getElementById("modelSelect");


// get list of models
const modelList = async () => {
    
        const res = await fetch(
        url+"/api/tags",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        if (!res.ok) {
            throw Error("Response error");
        }
        const modelList = await res.json();
        modelList["models"].forEach((model) => {
            models.push(model["model"]);
            const option = document.createElement("option");
            option.value = model["model"];
            option.textContent = model["name"];
            modelSelect.appendChild(option);
        });
    
}

//pre occupy the model list on page load
modelList();



//get response from ollama backend running on @url

const getResponse = async () => {
    try {
        addLoading();
        try {
            const res = await fetch(
                url+"/api/chat",
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify({
                    "model": modelSelect.value,
                    "messages": messages.filter((msg) => {
                        if (msg["role"] === "user") {
                            return true;
                        } else if (msg["role"] === "assistant") {
                            return !regPattern.test(msg["content"]);
                        }
                        return false;
                    }
                    ),
                    "temperature": 0.7,
                    "stream": false,
                })
                }
            );
            if (!res.ok) {
                throw Error("Response error");
            }
            const botResponse = await res.json();
            addBotMsg(botResponse.message);
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            removeLoading();
        }
    }
    catch (error) {
        console.error("Error occurred:", error);
    }
};


userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMsg();
    }
});


const removeLoading=()=>{
    const loadingD=document.getElementById("loading");
    loadingD.remove()
}

const clearChat = () => {
    messages = [];
    chatBox.innerHTML = "";
};

const getThinkMsg=(str)=>{
    const thinkMsg = {
        role: "assistant",
        content: str.replace(/<think>([\s\S]*?)<\/think>/i, "").trim()
    }
    return thinkMsg;
}
const addLoading=()=>{
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    loadingDiv.id="loading";
    loadingDiv.innerHTML = `...`;
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}




const deleteLoading=()=>{
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
        loadingElement.remove();
    }
}


// on sucessfull response bot add bot msg to div
const addBotMsg = (msg) => {
    console.log("Messages array:", messages);
    var msg=getThinkMsg(msg["content"]);
    messages.push(msg);
    const msgDiv = document.createElement("div");
    msgDiv.className = msg["role"];
    msgDiv.innerHTML = `${marked.parse(msg['content'])}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const removeWelcm=()=>{
    const wlcm=document.getElementById("welcome-msg");
    wlcm.style="display:none;"
}


const addUsrMsg = (msg) => {
    const role = "user"; 
    messages.push({
        "role": role,
        "content": msg
    });
    if (messages.length>=1){
        removeWelcm();
    }
    const msgDiv = document.createElement("div");
    msgDiv.className = role;
    msgDiv.innerHTML = `${msg}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const sendMsg = () => {
    if (userInput.value !== "") {
        addUsrMsg(userInput.value);
        userInput.value = "";
        getResponse();
    }
    else if (modelSelect.value === "") {
        alert("Please select a model");
    }
    else{
        alert("Prompt is empty");
    }
};