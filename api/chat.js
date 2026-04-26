<!DOCTYPE html>
<html>
<head>
  <title>Chatbot</title>
</head>
<body>

<h2>Chatbot</h2>

<input id="input" placeholder="Type something..." />
<button id="btn">Send</button>

<p id="output"></p>

<script>
document.getElementById("btn").addEventListener("click", send);

async function send() {
  const message = document.getElementById("input").value;

  console.log("Clicked button");
  console.log("Message:", message);

  if (!message) {
    alert("Type something first");
    return;
  }

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    console.log("Request sent");

    const data = await res.json();

    console.log("Response:", data);

    document.getElementById("output").innerText = data.reply;

  } catch (err) {
    console.error("Error:", err);
  }
}
</script>

</body>
</html>